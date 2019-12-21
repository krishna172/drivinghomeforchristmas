import {AssetGlobals} from "../assetsGlobals";
import {SceneDescription} from "../sceneDescription";
import {SceneHelper} from "./sceneHelper";
import {DialogBox} from "../dialogBox";
import {ConversationNode} from "../conversationNode";
import LoaderPlugin = Phaser.Loader.LoaderPlugin;

export class LoadingScene extends Phaser.Scene {
  private dbox: DialogBox;

  constructor() {
    super({
      key: "LoadingScene"
    });
  }

  preload(): void {
    this.load.json('scene0', './assets/sceneDescriptions/scene0.json');
    this.load.image( AssetGlobals.BG_IMAGE_LOADING, "./assets/backgrounds/"+AssetGlobals.BG_IMAGE_LOADING+".jpg");
  }

  create(): void {
    this.add.image(this.game.renderer.width/2,this.game.renderer.height/2,AssetGlobals.BG_IMAGE_LOADING);



    let game = this;
    this.renderActionText("press x to start!")
    this.input.keyboard.on("keydown_X", function (event) {
      SceneHelper.switchToMainScreen(game.scene.manager);
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


}


