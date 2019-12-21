import * as faceapi from 'face-api.js';
import {MainScene} from "./scenes/mainScene";
import BaseScene from "./scenes/BaseScene";

class Webcam {
    public htmlVideo: HTMLVideoElement;
    public htmlVideoDOM: HTMLVideoElement;
    public stream: MediaStream;
    private modelsLoaded: boolean;

    private static instance: Webcam;

    public constructor() {
        this.htmlVideoDOM = <HTMLVideoElement> document.getElementById('video');
        this.htmlVideo = document.createElement('video');;
        // @ts-ignore
        this.htmlVideo.playsinline = true;
        this.htmlVideo.width = 200;
        this.htmlVideo.height = 125;
        this.htmlVideo.autoplay = true;
    }

    public static async loadModels() {
        await faceapi.nets.ssdMobilenetv1.loadFromUri('assets/weights');
        await faceapi.nets.faceLandmark68Net.loadFromUri('assets/weights');
        await faceapi.nets.faceExpressionNet.loadFromUri('assets/weights');
        Webcam.instance.modelsLoaded = true;
    }

    public static async init() {
        if(!this.instance){
            this.instance = new Webcam();
            this.instance.stream = await this.instance.loadVideo();
            await Webcam.loadModels();
        }
        return this.instance;
    }

    public static isLoaded() {
        return Webcam.instance && Webcam.instance.stream != null && Webcam.instance.modelsLoaded;
    }

    async loadVideo() {
        let self = this;

        return  await navigator.mediaDevices.getUserMedia({video: true, audio: false})
            .then(function (stream) {
                console.log(stream);
                //https://phaser.io/examples/v3/view/game-objects/dom-element/video-element#
                self.htmlVideoDOM.srcObject = stream;
                self.htmlVideoDOM.play();
                self.stream = stream;

                console.log("Loaded video", self)
            })
            .catch(function (err) {
                console.log("An error occurred: " + err);
                return null;
            });
    }

    async detectFaces(mainScene : MainScene) {
        let emotion = null;
        try {
            const detectionsWithExpressions = await faceapi.detectSingleFace(
                this.htmlVideoDOM,
                new faceapi.SsdMobilenetv1Options()
            ).withFaceLandmarks().withFaceExpressions();

            const expression = detectionsWithExpressions.expressions.asSortedArray()[0];
            emotion = expression ? BaseScene.calculateExpressionFromString(expression.expression) : null;
        } catch(e) {
            console.error(e);
        }
        mainScene.onEmotion(emotion);
    }

    static getInstance() {
        return this.instance;
    }
}



export default Webcam;