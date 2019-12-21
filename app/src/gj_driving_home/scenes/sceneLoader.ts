import {SceneDescription} from "../sceneDescription";
import {ConversationNode} from "../conversationNode";

export class SceneLoader {

    game: Phaser.Scene;
    sceneDescription: SceneDescription;


    constructor(game: Phaser.Scene, sceneKey: string) {
        this.game = game;
        this.sceneDescription = game.cache.json.get(sceneKey);
    }

    loadScene(): SceneDescription {
        this.game.load.image(this.sceneDescription.bg_image_name, "./assets/backgrounds/" + this.sceneDescription.bg_image_name);
        this.game.load.audio(this.sceneDescription.bg_music_name, "./assets/music/" + this.sceneDescription.bg_music_name);
        this.loadConversationNode(this.sceneDescription.conversationTree);
        return this.sceneDescription;
    }

    private loadConversationNode(node: ConversationNode) {
        this.game.load.audio(node.audio_file_name, "./assets/sounds/" + node.audio_file_name);
        if (node.options == null) {
            return;
        }
        for (let option of node.options) {
            for (let node1 of option.nodes) {
                this.loadConversationNode(node1);
            }
        }
    }
}