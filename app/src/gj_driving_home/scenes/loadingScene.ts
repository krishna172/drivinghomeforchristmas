import {AssetGlobals} from "../assetsGlobals";
import {SceneDescription} from "../sceneDescription";
import {SceneHelper} from "./sceneHelper";
import {DialogBox} from "../dialogBox";
import {ConversationNode} from "../conversationNode";
import LoaderPlugin = Phaser.Loader.LoaderPlugin;
import {SceneLoadingData} from "./sceneLoadingData";

export class LoadingScene extends Phaser.Scene {
  private dbox: DialogBox;
  private _sceneData: SceneLoadingData;

  constructor() {
    super({
      key: "LoadingScene"
    });
  }

  init(data): void
  {
    console.log('init', data);
    this._sceneData = data;
    if(!this._sceneData.key){
      this._sceneData.key = "scene0"
    }
  }

  preload(): void {
    this.load.json('scene', './assets/sceneDescriptions/'+this._sceneData.key+'.json');
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


