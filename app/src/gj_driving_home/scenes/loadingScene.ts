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
    console.log(this._sceneData.key);
  }

  preload(): void {
    this.load.json(this._sceneData.key, './assets/sceneDescriptions/'+this._sceneData.key+'.json');
    this.load.image( AssetGlobals.BG_IMAGE_LOADING, "./assets/backgrounds/"+AssetGlobals.BG_IMAGE_LOADING+".jpg");
  }

  create(): void {
    this.add.image(this.game.renderer.width/2,this.game.renderer.height/2,AssetGlobals.BG_IMAGE_LOADING);



    console.log(this._sceneData);
      SceneHelper.switchToMainScreen(this.scene.manager,this._sceneData);
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


