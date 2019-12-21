import * as faceapi from 'face-api.js';
import {MainScene} from "./scenes/mainScene";
import BaseScene from "./scenes/BaseScene";
import {EmotionDetector} from "./emotion";
import TextureManager = Phaser.Textures.TextureManager;

class Webcam {
    public htmlVideo: HTMLVideoElement;
    public htmlVideoDOM: HTMLVideoElement;
    public stream: MediaStream;
    private modelsLoaded: boolean;
    private detectionActive: boolean;

    private static instance: Webcam;

    public constructor() {
        this.htmlVideoDOM = <HTMLVideoElement> document.getElementById('video');
        this.htmlVideo = document.createElement('video');;
        // @ts-ignore
        this.htmlVideo.playsinline = true;
        this.htmlVideo.width = 200;
        this.htmlVideo.height = 125;
        this.htmlVideo.autoplay = true;
        this.detectionActive = false;
    }

    public static async loadModels() {
        await faceapi.nets.ssdMobilenetv1.loadFromUri('assets/weights');
        await faceapi.nets.faceLandmark68Net.loadFromUri('assets/weights');
        await faceapi.nets.faceExpressionNet.loadFromUri('assets/weights');
        Webcam.instance.modelsLoaded = true;
    }

    public static async init(): Promise<Webcam> {
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

    updateCamCanvas(textures: TextureManager) {
        const canvas = <HTMLCanvasElement> document.createElement("canvas");
        const videoEl = Webcam.getInstance().htmlVideoDOM;
        canvas.width = videoEl.videoWidth;
        canvas.height = videoEl.videoHeight;
        const context2D = canvas.getContext("2d");
        context2D.drawImage(videoEl, 0, 0, videoEl.videoWidth, videoEl.videoHeight);
        textures.removeKey("webcam");
        textures.addCanvas("webcam", canvas);
    }

    async detectFaces(emotionDetector : EmotionDetector, beforeDetect: Function) {
        let emotion = null;
        if(this.detectionActive) {
            console.log("detectFaces: Skip loading expression already running");
            return;
        }
        if(beforeDetect) {
            beforeDetect();
        }
        this.detectionActive = true;
        let started = Date.now();
        console.log("detectFaces: Started " + started);
        try {
            const detectionsWithExpressions = await faceapi.detectSingleFace(
                this.htmlVideoDOM,
                new faceapi.SsdMobilenetv1Options()
            ).withFaceLandmarks().withFaceExpressions();

            const expression = detectionsWithExpressions.expressions.asSortedArray()[0];
            console.log("detectFaces: Detected expression", expression)
            emotion = expression ? BaseScene.calculateExpressionFromString(expression.expression) : null;
        } catch(e) {
            console.error(e);
        }
        this.detectionActive = false;
        emotionDetector.onEmotion(emotion);
        console.log("detectFaces: Finished " + (Date.now() - started) + " " + emotion);
    }

    static getInstance() {
        return this.instance;
    }
}



export default Webcam;