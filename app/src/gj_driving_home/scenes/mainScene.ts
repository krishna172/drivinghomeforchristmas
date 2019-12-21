import {SceneDescription} from "../sceneDescription";
import {SceneHelper} from "./sceneHelper";
import {SceneLoadingData} from "./sceneLoadingData";
import {SceneLoader} from "./sceneLoader";
import Webcam from "../video";
import Video = Phaser.Device.Video;
import DOMElement = Phaser.GameObjects.DOMElement;

export class MainScene extends Phaser.Scene {

  constructor() {
    super({
      key: "MainScene"
    });
  }

  private _sceneDescription :SceneDescription;
  private webcam: Webcam;
  private video: DOMElement;

  async preload() {
    this._sceneDescription = new SceneLoader(this,"scene").loadScene();
    this.webcam = new Webcam();
    await this.webcam.init()
  }

  create(): void {

    this.sound.play(this._sceneDescription.bg_music_name,{loop:true});
    this.video = this.add.dom(100, 100, this.webcam.htmlVideo);
    console.log(this._sceneDescription.bg_image_name);
    this.add.image(this.game.renderer.width/2,this.game.renderer.height/2,this._sceneDescription.bg_image_name);
    let game = this;
    this.input.keyboard.on("keydown_X", function (event) {
      SceneHelper.transitionScene(game,new SceneLoadingData("scene0"));
    });
  }


}

