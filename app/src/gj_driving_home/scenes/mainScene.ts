import {SceneDescription} from "../sceneDescription";
import {SceneHelper} from "./sceneHelper";
import {SceneLoadingData} from "./sceneLoadingData";
import {SceneLoader} from "./sceneLoader";
import {DialogBox} from "../dialogBox";
import {ConversationNode} from "../conversationNode";
import {Emotion} from "../emotion";
import {EmotionOptions} from "../emotionOptions";
import {SoundController} from "../soundController";

export class MainScene extends Phaser.Scene {
  private dbox: DialogBox;
  private _currentEmotion: Emotion;
  private _soundController: SoundController

  constructor() {
    super({
      key: "MainScene"
    });
  }

  private _sceneDescription :SceneDescription;

  preload(): void {
    this._sceneDescription = new SceneLoader(this,"scene").loadScene();
    this._conversationTree = this._sceneDescription.conversationTree;
  }

  private _conversationTree : ConversationNode;

  create(): void {
    this._soundController = SoundController.getInstance();
    this._soundController.playMusic(this.sound, this._sceneDescription.bg_music_name,true);
    //this.sound.play(this._sceneDescription.bg_music_name,{loop:true});
    this.add.image(this.game.renderer.width/2,this.game.renderer.height/2,this._sceneDescription.bg_image_name);
    this.renderConversationNode(this._conversationTree, this._currentEmotion);
    let game = this;

    //TODO actual emotion detection here

    this.input.keyboard.on('keydown', function (event) {
      let code = event.code;

      switch (code) {
        case "KeyA":
          game._currentEmotion = Emotion.Angry;
          break;
        case "KeyH":
          game._currentEmotion = Emotion.Happy;
          break;
        case "KeyN":
          game._currentEmotion = Emotion.NEUTRAL;
          break;
        case "KeyS":
          game._currentEmotion = Emotion.Surprised;
          break;
      }



      switch (code) {
        case "Digit1":
          game._conversationTree = game._conversationTree[1];
          break;
        case "Digit2":
          game._conversationTree = game._conversationTree[2];
          break;
        case "Digit3":
          game._conversationTree = game._conversationTree[3];
          break;
        case "Digit4":
          game._conversationTree = game._conversationTree[4];
          break;
      }
      game.renderConversationNode(game._conversationTree, game._currentEmotion);


    });


    this.input.keyboard.on("keydown_X", function (event) {
      let key = "scene0"; //todo actual scene key from conversation node transition
      SceneHelper.transitionScene(game,new SceneLoadingData(key));
    });
  }


  renderActionText(text: string) {
    if(this.dbox){
      this.dbox.toggleWindow();
    }
    this.dbox = new DialogBox(this);
    this.dbox._createWindow();
    this.dbox.setText(text, false);
  }


  private renderConversationNode(conversationTree: ConversationNode, emotion: Emotion) {
    let options: Array<ConversationNode>;
    let optionsText: string;
    optionsText = "";
    for (let option of conversationTree.options) {
      if (option.emotion == emotion) {
        options = option.nodes;
      }
    }
    let i : number;
    if(emotion !=null && options){
      i = 0;
      for (let conversationNode of options) {
        i++;
        optionsText += "["+i+"]  "+conversationNode.name+"   ";
      }
    }

    this.renderActionText(conversationTree.text+'\n'+ optionsText);

  }
}

