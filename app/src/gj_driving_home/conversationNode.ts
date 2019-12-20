import {Emotion} from "./emotion";
import {EmotionOptions} from "./scenes/emotionOptions";

export class ConversationNode {
    id : number;
    name : string;
    text : string;
    audio_file_name : string;
    transition : string;
    options: Array<EmotionOptions>;

    constructor(id: number, text: string, options:Array<EmotionOptions>) {
        this.id = id;
        this.text = text;
        this.options = options;
    }
}

