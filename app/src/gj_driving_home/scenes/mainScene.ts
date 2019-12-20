import {AssetGlobals} from "../assetsGlobals";

export class MainScene extends Phaser.Scene {

  constructor() {
    super({
      key: "MainScene"
    });
  }

  preload(): void {
    this.load.image("logo", "./assets/boilerplate/phaser.png");
  }

  create(): void {
    this.add.image(this.game.renderer.width/2,this.game.renderer.height/2,'logo');
  }
}
