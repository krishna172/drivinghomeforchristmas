import {Emotion, EmotionDetector} from "../emotion";

abstract class BaseScene extends Phaser.Scene implements EmotionDetector {
    protected _timeSinceLastDetect: number;


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


    update(time: number, delta: number): void {
        if(!this._timeSinceLastDetect) {
            this._timeSinceLastDetect = 0;
        }
        this._timeSinceLastDetect += delta;
        if (this._timeSinceLastDetect > 300) {
            this._timeSinceLastDetect = 0;
            this.onLastDetectPassed();
        }
    }

    onLastDetectPassed() {

    }
}

export default BaseScene;