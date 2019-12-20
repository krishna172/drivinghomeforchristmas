import {ConversationNode} from "./conversationNode";

export class SceneDescription {
    title: string;
    bg_music_name: string;
    bg_image_name: string;
    conversationTree: ConversationNode;

    constructor() {
    };

    setAll(title: string, bg_music_name: string, bg_image_name: string, conversationTree: ConversationNode) {
        this.title = title;
        this.bg_music_name = bg_music_name;
        this.bg_image_name = bg_image_name;
        this.conversationTree = conversationTree;
    }
}