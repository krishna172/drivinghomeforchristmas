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



    let emotionOptions = new Array<EmotionOptions>();
    let nodes: Array<ConversationNode> = new Array<ConversationNode>();
    nodes.push(new ConversationNode(0,"Hello kind sir!",null));
    nodes.push(new ConversationNode(1,"Once again, blub!!",null));
    nodes.push(new ConversationNode(2,"Once again, blub!!",null));
    emotionOptions.push(new EmotionOptions(Emotion.Angry, nodes));
    emotionOptions.push(new EmotionOptions(Emotion.Happy, nodes));
    let conversationNode = new ConversationNode(3,"Hello, decide your asdfasdf!.", emotionOptions);

    let sceneDescription = new SceneDescription();
    sceneDescription.title= "First Scene";
    sceneDescription.conversationTree = conversationNode;
    console.log(JSON.stringify(sceneDescription));



  }

  create(): void {
    this.add.image(this.game.renderer.width/2,this.game.renderer.height/2,AssetGlobals.BG_IMAGE);
  }
}
