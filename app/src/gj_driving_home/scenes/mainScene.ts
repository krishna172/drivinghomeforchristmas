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
    nodes.push(new ConversationNode(0,"Die", "I'd like to die.","sound04.mp3","GameOver",null));
    nodes.push(new ConversationNode(1,"Live","I'd like to live","sound03.mp3",null,null));
    nodes.push(new ConversationNode(2,"Ignore","Once again, blub!!","sound02.mp3",null,null));
    emotionOptions.push(new EmotionOptions(Emotion.Angry, nodes));
    emotionOptions.push(new EmotionOptions(Emotion.Happy, nodes));
    let conversationNode = new ConversationNode(3,"Faith","Hello, decide your faith!.", "sound01.mp3",null, emotionOptions);

    let sceneDescription = new SceneDescription("First Scene","music0.mp3","bg_scene_sample.png",conversationNode);

    console.log(JSON.stringify(sceneDescription));



  }

  create(): void {
    this.add.image(this.game.renderer.width/2,this.game.renderer.height/2,AssetGlobals.BG_IMAGE);
  }
}
