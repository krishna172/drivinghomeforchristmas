import {AssetGlobals} from "../assetsGlobals";
import {ConversationNode} from "../conversationNode";
import {Emotion} from "../emotion";
import {SceneDescription} from "../sceneDescription";
import {EmotionOptions} from "./emotionOptions";

export class MainScene extends Phaser.Scene {

  constructor() {
    super({
      key: "MainScene"
    });
  }

  preload(): void {
    this.load.image( AssetGlobals.BG_IMAGE, "./assets/backgrounds/bg_scene_sample.jpg");

    this.load.json('scene0', './assets/sceneDescriptions/scene0.json');





  }

  create(): void {
    this.add.image(this.game.renderer.width/2,this.game.renderer.height/2,AssetGlobals.BG_IMAGE);

    let data = this.cache.json.get('scene0');

    let sceneDescription : SceneDescription = data;

  }
}
