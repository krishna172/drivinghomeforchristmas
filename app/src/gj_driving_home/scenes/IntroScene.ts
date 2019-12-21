import BaseScene from "./BaseScene";
import {Emotion, EmotionDetector} from "../emotion";
import Webcam from "../video";
import BaseSound = Phaser.Sound.BaseSound;
import {SceneHelper} from "./sceneHelper";
import {SceneLoadingData} from "./sceneLoadingData";
import Texture = Phaser.Textures.Texture;

export class IntroScene extends BaseScene {
    private _sceneData: any;
    private radioStatic: Phaser.Sound.BaseSound;
    private currentSound: Phaser.Sound.BaseSound;


    preload() {
        this.load.image("bg_intro", "./assets/backgrounds/bg_scene_00.jpg");
        this.load.audio("radio_static","./assets/music/radio_static.wav");
        for (let i = 1; i < 5; i++) {
            this.load.audio("p"+i,"./assets/music/intro/part0"+i+".wav");
            this.load.audio("p"+i+"r1","./assets/music/intro/part0"+i+"_R1.wav");
            this.load.audio("p"+i+"r2","./assets/music/intro/part0"+i+"_R2.wav");
        }
        this.load.audio("p5","./assets/music/intro/part05.wav");
    }


    create(): void {
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "bg_intro");
        this.radioStatic = this.sound.add("radio_static");
        Webcam.getInstance().updateCamCanvas(this.textures);

        this.radioStatic.play();
        const self = this;
        this.radioStatic.on('complete', function () {
            console.log("completed radio static");
            const finished = new FinishedStage(self.sound.add("p5"), function () {
                SceneHelper.transitionScene(self, new SceneLoadingData("scene0",null))
            });
            const i4 = new IntroStage(
                self,
                self.sound.add("p4"),
                self.sound.add("p4r1"),
                self.sound.add("p4r2"),
                Emotion.Surprised,
                finished
            );
            const i3 = new IntroStage(
                self,
                self.sound.add("p3"),
                self.sound.add("p3r1"),
                self.sound.add("p3r2"),
                Emotion.NEUTRAL,
                i4
            );
            const i2 = new IntroStage(
                self,
                self.sound.add("p2"),
                self.sound.add("p2r1"),
                self.sound.add("p2r2"),
                Emotion.Angry,
                i3
            );
            const i1 = new IntroStage(
                self,
                self.sound.add("p1"),
                self.sound.add("p1r1"),
                self.sound.add("p1r2"),
                Emotion.Happy,
                i2
            );
            i1.start();
        })
        let game = this;
        this.input.keyboard.on("keydown_X", function (event) {
            game.sound.stopAll();
            SceneHelper.transitionScene(game,new SceneLoadingData("scene0",null));
        });
        this.renderWebCamPic();
    }


    onEmotion(emotion: Emotion) {
    }


    onLastDetectPassed() {
        super.onLastDetectPassed();
        Webcam.getInstance().updateCamCanvas(this.textures);
        this.renderWebCamPic();

    }

    renderWebCamPic() {
        let image = this.add.image(
            this.game.renderer.width/2,
            0,
            "webcam"
        );
        image.setOrigin(0.5, 0);
        image.setScale(0.5);
        image.flipX = true;

    }

}


class IntroStage implements EmotionDetector {
    protected task: Phaser.Sound.BaseSound;
    private introScene: IntroScene;
    private success: Phaser.Sound.BaseSound;
    private fail: Phaser.Sound.BaseSound;
    private readonly emotionGoal: Emotion;
    private nextStage: IntroStage;
    private text: Phaser.GameObjects.Text;

    constructor(introScene: IntroScene, task: BaseSound, success: BaseSound, fail: BaseSound, emotion: Emotion, nextStage: IntroStage) {
        this.introScene = introScene;
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
            self.renderText();
            const video = await Webcam.init();
            await video.detectFaces(self, null);
        } )
    }

    renderText() {
        this.text = this.introScene.add.text(
            this.introScene.game.renderer.width/3,
            this.introScene.game.renderer.height/2,
            "Prepare to look " + Emotion[this.emotionGoal] + "!",
            {
                color: 'red',
                fontFamily: '"Roboto Condensed"',
                fontSize: '64px'
            }
        );
    }

    removeText() {
        if(this.text) {
            this.text.destroy();
        }
    }


    async onEmotion(emotion: Emotion) {
        this.removeText();
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
                await video.detectFaces(self, function() {
                    video.updateCamCanvas(self.introScene.textures);
                    self.introScene.renderWebCamPic();
                });
            })
        }
    }


}

class FinishedStage extends IntroStage {

    private readonly finished: Function;

    constructor(task: BaseSound, finished: Function) {
        super(null, task, null, null, null, null);
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