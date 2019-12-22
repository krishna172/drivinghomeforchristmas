import {SceneDescription} from "../sceneDescription";
import {SceneHelper} from "./sceneHelper";
import {SceneLoadingData} from "./sceneLoadingData";
import {SceneLoader} from "./sceneLoader";
import Webcam from "../video";
import {DialogBox} from "../dialogBox";
import {ConversationNode} from "../conversationNode";
import {Emotion} from "../emotion";
import {SoundController} from "../soundController";
import {AssetGlobals} from "../assetsGlobals";
import DOMElement = Phaser.GameObjects.DOMElement;
import BaseScene from "./BaseScene";


export class MainScene extends BaseScene {
    private dbox: DialogBox;
    private _currentEmotion: Emotion;
    private _soundController: SoundController;
    private _sceneData: SceneLoadingData;
    private redLight: Phaser.GameObjects.Light;
    private blueLight: Phaser.GameObjects.Light;
    private redTimer: number = 0;
    private copFem: Phaser.GameObjects.Sprite;
    //private blueTimer: number = 100;
    private _actionDelay: number;
    private switchScene: boolean;
    private sceneLoadingData: SceneLoadingData;
    private bgImageCamText: any;

    constructor() {
        super({
            key: "MainScene"
        });
    }

    private _sceneDescription: SceneDescription;
    private webcam: Webcam;
    private video: DOMElement;

    init(data): void
    {
        console.log('init', data);
        this._sceneData = data;
        //item scene hack
        this.dbox = null;
        console.log(this._sceneData.getKey());
    }

    preload() {
        this.load.image(AssetGlobals.BG_IMAGE_MAIN_CAM, "./assets/backgrounds/"+AssetGlobals.BG_IMAGE_MAIN_CAM+".png");
        this.load.audio("radio_static","./assets/music/radio_static.wav");
        this.load.audio("radio0","./assets/music/radio00.mp3");
        this.load.audio("radio1","./assets/music/radio01.mp3");
        this.load.image("copFem", ["./assets/sprites/cop_fem.png","./assets/b.png"]);
        this.load.audio("radio2","./assets/music/radio02.mp3");
        this.load.audio("radio3","./assets/music/radio03.mp3");
        this.load.audio("radio4","./assets/music/radio04.mp3");
        this.load.audio("radio5","./assets/music/radio05.mp3");
        this.load.audio("radio6","./assets/music/radio06.mp3");
        this.load.audio("radio7","./assets/music/radio07.mp3");
        this.load.audio("radio8","./assets/music/radio08.mp3");
        this.load.audio("radio9","./assets/music/radio09.mp3");
        this.load.audio("radio10","./assets/music/radio10.mp3");
        this.load.audio("radio11","./assets/music/radio11.mp3");
        console.log(this._sceneData.getKey()+" is the key");
        if(this._sceneData.getKey() == "scene_end"){
            SceneHelper.steeringScene(this,null);
        }
        this._sceneDescription = new SceneLoader(this, this._sceneData.getKey()).loadScene();
        this.webcam = Webcam.getInstance();
        this._conversationTree = this._sceneDescription.conversationTree;
        console.log(this._conversationTree);
        this.load.image(AssetGlobals.Knob, "./assets/knob/" + AssetGlobals.Knob);


    }

    private _conversationTree: ConversationNode;

    create(): void {
        this._soundController = SoundController.getInstance();
        this._soundController.sound = this.sound;
        this._timeSinceLastDetect = 0;
        Webcam.init();
        console.log("added video");
        let img:Phaser.GameObjects.Image = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, this._sceneDescription.bg_image_name);

        this.renderConversationNode(this._conversationTree, this._currentEmotion);
        let game = this;
        if(this._sceneData.getKey() == "scene1") {
            console.log("Yay! Scene1 Create")
            img.setPipeline('Light2D');
            this.copFem = this.add.sprite(this.game.renderer.width * 0.5, this.game.renderer.height * 0.75, "copFem");
            this.copFem.setPipeline('Light2D');

            this.redLight  = this.lights.addLight(920, 320, 1500);
            this.blueLight  = this.lights.addLight(890, 320, 1500);
            this.lights.enable().setAmbientColor(0x555555);
        }
        this.input.keyboard.on('keydown', function (event) {
            let code = event.code;
            console.log(code);
      if(game._conversationTree != null){

            switch (code) {
              case "Digit1":
                  console.log("selected digit 1 *********************");
                  console.log(game._conversationTree);
                  game.navigate(game,0);
                  console.log(game._conversationTree);

                  break;
              case "Digit2":
                  console.log("selected digit 2 *********************");
                  console.log(game._conversationTree);
                  game.navigate(game,1);
                  console.log(game._conversationTree);
                break;
              case "Digit3":
                  console.log(game._conversationTree);
                  game.navigate(game,2);
                  console.log(game._conversationTree);
                break;
              case "Digit4":
                  console.log(game._conversationTree);
                  game.navigate(game,3);
                  console.log(game._conversationTree);
                break;
            }
            game.renderConversationNode(game._conversationTree, game._currentEmotion);
      }



        });

        this.input.keyboard.on("keydown_D", function (event) {
            SceneHelper.steeringScene(game,null);
        });

    let image = this.add.image(this.game.renderer.width - 150, this.game.renderer.height - 150, AssetGlobals.Knob );
    const radioButton = image
        .setInteractive()
        .on('pointerdown', () => {
          SoundController.getInstance().initRadioSong();
          image.angle +=  10;
        });

        let imageVolume = this.add.image(this.game.renderer.width - 375, this.game.renderer.height - 150, AssetGlobals.Knob );
        const radioKnobVolume = imageVolume
            .setInteractive()
            .on('pointerdown', () => {
                SoundController.getInstance().adjustVolume();
                imageVolume.angle +=  20;
            });

        let bgImageCam = this.add.image(
            this.game.renderer.width/2 + 250,
            this.game.renderer.height/4 + 50,
            AssetGlobals.BG_IMAGE_MAIN_CAM);
        bgImageCam.setOrigin(0.5,0.5);

        this.bgImageCamText = this.add.text(
            this.game.renderer.width/2+80,
            this.game.renderer.height/4 + 125,
            ";-)", {font: '30px monospace'});
    }

    private navigate(game: this, nbr: number) {
        if (game._conversationTree.options) {
            for (let option of game._conversationTree.options) {
                if (option.emotion == game._currentEmotion || option.emotion == null) {
                    game._conversationTree = option.nodes[nbr];
                }
            }
        }
    }

    update(time: number, delta: number): void {
        super.update(time, delta);
        if(this._actionDelay > 0){
            this._actionDelay -= delta;
        }
        //console.log("Hallo Veit, das ist die "+this._sceneData.getKey()+" Szene. Viel spaß.");
        if(this.blueLight != undefined && this._sceneData.getKey() == "scene1"){
                this.redTimer += delta;
                //this.blueTimer += delta;
                this.blueLight.setColor(0x0000ff);
                //this.blueLight.setIntensity(200);
                this.redLight.setColor( 0xff0000 );
                //this.redLight.setIntensity(200);
                if(this.redTimer >=700 && this.redTimer <= 800){
                    this.redLight.setIntensity(100);
                    //console.log("red1");
                }
                else if(this.redTimer>=800 && this.redTimer<=900){
                    //console.log("red2;")
                    //this.redTimer = 0;
                    this.redLight.setIntensity(0);
                }
                else if(this.redTimer>=900 && this.redTimer<=1000){
                this.blueLight.setIntensity(100);
                }
                else if(this.redTimer>=1000){
                this.redTimer = 0;
                this.blueLight.setIntensity(0);
                }
        }
        this._soundController.update(delta);
        console.log(this._actionDelay);

        if(this.switchScene && this._actionDelay<=0){
            if(this._sceneData.getKey() == "scene0"){
                SceneHelper.switchToRaccoonScene(this,this.sceneLoadingData);
            }
            else if (this._sceneData.getKey() == "scene_end"){
                console.log("Switsch Scene " + this._sceneData.getKey())
                SceneHelper.steeringScene(this,this.sceneLoadingData);
            }
            else{
                SceneHelper.transitionScene(this,this.sceneLoadingData);
            }
            this.switchScene = false;
        }


    }


    onLastDetectPassed() {
        super.onLastDetectPassed();
        const self = this;
        this.webcam.detectFaces(this, function(){
            Webcam.getInstance().updateCamCanvas(self.textures);
            self.renderWebCamPic();
        });
    }

    renderWebCamPic() {
        let image = this.add.image(
            this.game.renderer.width/2 + 250,
            this.game.renderer.height/4 - 15,
            "webcam"
        );
        image.setOrigin(0.5, 0.5);
        image.setScale(0.5);

    }

    renderActionText(text: string) {
        if (this.dbox == null) {
            this.dbox = new DialogBox(this);
            this.dbox._createWindow();
        }
        this.dbox.setText(text, false);
    }


  private renderConversationNode(conversationTree: ConversationNode, emotion: Emotion) {
    let options: Array<ConversationNode>;
    let optionsText: string;
    optionsText = ""
    if(conversationTree == null){
      return;
    }
    if(!conversationTree.wasPlayed){
        try {
            let soundDuration = this._soundController.playSound(conversationTree.audio_file_name);
           console.log("sound duration "+ soundDuration)
            this._actionDelay=2000;
        }catch (e) {

        }
        conversationTree.wasPlayed = true;
    }

      if(conversationTree.transition != null){
          if(conversationTree.item == null){
              conversationTree.item = this._sceneData.item;
              console.log("we bring our item from last scene: "+conversationTree.item);
          }else{
              console.log("we bring our item "+ conversationTree.item);
          }
          this.sceneLoadingData = new SceneLoadingData(conversationTree.transition,conversationTree.item);

          this.switchScene = true;
      }

    if(conversationTree.options != null && this._actionDelay <= 0){
        for (let option of conversationTree.options) {
          if (option.emotion == emotion || option.emotion == null) {
            options = option.nodes;
          }
        }
    }
    let i : number;
    if(options){
      i = 0;
      for (let conversationNode of options) {
        i++;
        optionsText += "["+i+"]  "+conversationNode.name+"   " ;
      }
    }

        this.renderActionText(conversationTree.text + '\n' + optionsText); //+ Emotion[this._currentEmotion]


    }

    onEmotion(emotion: Emotion) {
        this._currentEmotion = emotion;
        this.renderConversationNode(this._conversationTree, this._currentEmotion);
        let emotionText = "";
        if(this._currentEmotion == null){
            emotionText = "UNDEFINED";
        }else{
            emotionText = Emotion[this._currentEmotion];
        }
        this.bgImageCamText.setText(emotionText);
    }


}

