import BaseScene from "./BaseScene";
import {Emotion, EmotionDetector} from "../emotion";
import Webcam from "../video";
import BaseSound = Phaser.Sound.BaseSound;
import {SceneHelper} from "./sceneHelper";
import {SceneLoadingData} from "./sceneLoadingData";

export class IntroScene extends BaseScene {
    private _sceneData: any;
    private radioStatic: Phaser.Sound.BaseSound;
    private currentSound: Phaser.Sound.BaseSound;


    init(data): void
    {
        console.log('init', data);
        this._sceneData = data;
        if(!this._sceneData.key){
            this._sceneData.key = "introScene"
        }
    }

    preload() {
        this.load.audio("radio_static","./assets/music/radio_static.wav");
        for (let i = 1; i < 5; i++) {
            this.load.audio("p"+i,"./assets/music/intro/part0"+i+".wav");
            this.load.audio("p"+i+"r1","./assets/music/intro/part0"+i+"_R1.wav");
            this.load.audio("p"+i+"r2","./assets/music/intro/part0"+i+"_R2.wav");
        }
        this.load.audio("p5","./assets/music/intro/part05.wav");
    }


    create(): void {
        this.radioStatic = this.sound.add("radio_static");


        this.radioStatic.play();
        const self = this;
        this.radioStatic.on('complete', function () {
            console.log("completed radio static");
            const finished = new FinishedStage(self.sound.add("p5"), function () {
                SceneHelper.transitionScene(self, new SceneLoadingData("scene0"))
            });
            const i4 = new IntroStage(
                self.sound.add("p4"),
                self.sound.add("p4r1"),
                self.sound.add("p4r2"),
                Emotion.Surprised,
                finished
            );
            const i3 = new IntroStage(
                self.sound.add("p3"),
                self.sound.add("p3r1"),
                self.sound.add("p3r2"),
                Emotion.NEUTRAL,
                i4
            );
            const i2 = new IntroStage(
                self.sound.add("p2"),
                self.sound.add("p2r1"),
                self.sound.add("p2r2"),
                Emotion.Angry,
                i3
            );
            const i1 = new IntroStage(
                self.sound.add("p1"),
                self.sound.add("p1r1"),
                self.sound.add("p1r2"),
                Emotion.Happy,
                i2
            );
            i1.start();
        })
    }

    onEmotion(emotion: Emotion) {
    }


}


class IntroStage implements EmotionDetector {
    protected task: Phaser.Sound.BaseSound;
    private success: Phaser.Sound.BaseSound;
    private fail: Phaser.Sound.BaseSound;
    private readonly emotionGoal: Emotion;
    private nextStage: IntroStage;

    constructor(task: BaseSound, success: BaseSound, fail: BaseSound, emotion: Emotion, nextStage: IntroStage) {
        this.task = task;
        this.success = success;
        this.fail = fail;
        this.emotionGoal = emotion;
        this.nextStage = nextStage;
    }

    public async start() {
        console.log("Start intro scene");
        this.task.play();
        const self = this;
        this.task.on('complete', async function () {
            const video = await Webcam.init();
            await video.detectFaces(self);
        } )
    }

    async onEmotion(emotion: Emotion) {
        console.log("Detected for emotion " + Emotion[this.emotionGoal] + " was " +  Emotion[emotion]);
        const self = this;
        if(this.emotionGoal == emotion) {
            this.success.play();

            this.success.on('complete', function() {
                self.nextStage.start();
            });
        } else {
            this.fail.play();
            this.fail.on('complete', async function() {
                const video = await Webcam.init();
                await video.detectFaces(self);
            })
        }
    }


}

class FinishedStage extends IntroStage {

    private readonly finished: Function;

    constructor(task: BaseSound, finished: Function) {
        super(task, null, null, null, null);
        this.finished = finished;
    }


    async start(): Promise<void> {
        this.task.play();
        const self = this;
        this.task.on('complete', function(){
            console.log("Finished intro");
            self.finished();
        });

    }
}