import {AssetGlobals} from "../assetsGlobals";
import {SceneDescription} from "../sceneDescription";

export class LoadingScene extends Phaser.Scene {

  constructor() {
    super({
      key: "LoadingScene"
    });
  }

  preload(): void {
    this.load.json('scene0', './assets/sceneDescriptions/scene0.json');
    this.load.image( AssetGlobals.BG_IMAGE_LOADING, "./assets/backgrounds/"+AssetGlobals.BG_IMAGE_LOADING+".jpg");
    this.load.image( AssetGlobals.BG_IMAGE, "./assets/backgrounds/"+AssetGlobals.BG_IMAGE+".jpg");
  }

  create(): void {
    this.add.image(this.game.renderer.width/2,this.game.renderer.height/2,AssetGlobals.BG_IMAGE_LOADING);
    let sceneDescription : SceneDescription = this.cache.json.get('scene0');

  }
}
