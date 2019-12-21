export enum Emotion {
    NEUTRAL,
    Happy,
    Angry,
    Surprised,
}

export interface EmotionDetector {
    onEmotion(emotion: Emotion);
}