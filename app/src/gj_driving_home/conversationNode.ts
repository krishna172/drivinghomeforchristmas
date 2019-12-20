import {Emotion} from "./emotion";

export class ConversationNode {
    id : string;
    text : string;
    options: Map<Emotion, ConversationNode>;


    constructor(id: string, text: string, options: Map<Emotion, ConversationNode>) {
        this.id = id;
        this.text = text;
        this.options = options;
    }
}

