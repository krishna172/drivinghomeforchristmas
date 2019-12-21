import {AssetGlobals} from "../assetsGlobals";
import {SceneDescription} from "../sceneDescription";
import {SceneHelper} from "./sceneHelper";
import {ConversationNode} from "../conversationNode";
import LoaderPlugin = Phaser.Loader.LoaderPlugin;

export class MainScene extends Phaser.Scene {

  constructor() {
    super({
      key: "MainScene"
    });
  }

  private _sceneDescription :SceneDescription;

  preload(): void {
    this._sceneDescription = this.cache.json.get('scene0');
    this.loadScene(this._sceneDescription);
  }

  create(): void {

    this.sound.play(this._sceneDescription.bg_music_name,{loop:true});
    console.log(this._sceneDescription.bg_image_name);
    this.add.image(this.game.renderer.width/2,this.game.renderer.height/2,this._sceneDescription.bg_image_name);
  }

  private loadScene(sceneDescription: SceneDescription) {
    this.load.image( sceneDescription.bg_image_name, "./assets/backgrounds/"+sceneDescription.bg_image_name);
    console.log("./assets/backgrounds/"+sceneDescription.bg_image_name);
    this.load.audio( sceneDescription.bg_music_name, "./assets/music/"+sceneDescription.bg_music_name);
    this.loadConversationNode(sceneDescription.conversationTree);
  }

  private loadConversationNode(node: ConversationNode) {
    this.load.audio( node.audio_file_name, "./assets/sounds/"+node.audio_file_name);
    if(node.options== null){
      return;
    }
    for (let option of node.options) {
      for (let node1 of option.nodes) {
        this.loadConversationNode(node1);
      }
    }
  }
}

