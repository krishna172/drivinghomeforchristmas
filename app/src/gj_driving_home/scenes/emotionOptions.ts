import {Emotion} from "../emotion";
import {ConversationNode} from "../conversationNode";

export class EmotionOptions {
    constructor(angry: Emotion, nodes: Array<ConversationNode>) {
        this.emotion = angry;
        this.nodes = nodes;
    }

    emotion: Emotion;
    nodes: Array<ConversationNode>;
}