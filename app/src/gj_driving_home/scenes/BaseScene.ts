import {Emotion} from "../emotion";

abstract class BaseScene extends Phaser.Scene {

    abstract onEmotion(emotion: Emotion)

    static calculateExpressionFromString(expression: string): Emotion {
        switch (expression) {
            case "happy":
                return Emotion.Happy;
                break;
            case "angry":
                return Emotion.Angry;
                break;
            case "neutral":
                return  Emotion.NEUTRAL;
                break;
            case "surprised":
                return  Emotion.Surprised;
                break;
            default:
                return null;
        }
    }
}

export default BaseScene;