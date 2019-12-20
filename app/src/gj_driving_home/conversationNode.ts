import {Emotion} from "./emotion";

export class ConversationNode {
    id : string;
    text : string;
    options: { [id: number] : ConversationNode; };
}

