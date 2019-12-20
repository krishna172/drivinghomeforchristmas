import {Emotion} from "./emotion";
import {EmotionOptions} from "./scenes/emotionOptions";

export class ConversationNode {
    id : number;
    name : string;
    text : string;
    audio_file_name : string;
    transition : string;
    options: Array<EmotionOptions>;


    constructor(id: number, name: string, text: string, audio_file_name: string, transition: string, options: Array<EmotionOptions>) {
        this.id = id;
        this.name = name;
        this.text = text;
        this.audio_file_name = audio_file_name;
        this.transition = transition;
        this.options = options;
    }
}

