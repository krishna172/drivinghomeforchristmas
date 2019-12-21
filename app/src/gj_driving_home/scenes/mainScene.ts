import {SceneDescription} from "../sceneDescription";
import {SceneHelper} from "./sceneHelper";
import {SceneLoadingData} from "./sceneLoadingData";
import {SceneLoader} from "./sceneLoader";

export class MainScene extends Phaser.Scene {

  constructor() {
    super({
      key: "MainScene"
    });
  }

  private _sceneDescription :SceneDescription;

  preload(): void {
    this._sceneDescription = new SceneLoader(this,"scene").loadScene();
  }

  create(): void {

    this.sound.play(this._sceneDescription.bg_music_name,{loop:true});
    console.log(this._sceneDescription.bg_image_name);
    this.add.image(this.game.renderer.width/2,this.game.renderer.height/2,this._sceneDescription.bg_image_name);
    let game = this;
    this.input.keyboard.on("keydown_X", function (event) {
      SceneHelper.transitionScene(game,new SceneLoadingData("scene0"));
    });
    //TODO debug steering
    this.input.keyboard.on("keydown_D", function (event) {
      console.log("DE");
      SceneHelper.steeringScene(game,new SceneLoadingData("sceneSteering"));
    });
  }


}

