import {SceneLoadingData} from "./sceneLoadingData";
import {SoundController} from "../soundController";

export class SceneHelper {

    public static switchToMainScreen(scene: Phaser.Scenes.SceneManager, data : SceneLoadingData): void {
        console.log("here we go again!");
        //SoundController.getInstance().sound = scene.sound; todo CHECK IF THIS KILLS US
        scene.start('MainScene',data);
        scene.stop('LoadingScene');
        scene.dump();
    }

    public static transitionScene(game: Phaser.Scene, sceneKey: SceneLoadingData): void {
        console.log("here we go again for "+ sceneKey.key);

        SoundController.getInstance().sound = game.sound;
        game.scene.manager.stop('MainScene');
        game.scene.manager.start('LoadingScene', sceneKey);
        game.scene.manager.dump();
    }

    public static steeringScene(game: Phaser.Scene, sceneKey: SceneLoadingData): void {
        console.log("Steering scene ", sceneKey);
        game.scene.manager.stop('MainScene');
        game.scene.manager.start('SteeringWheelScene', sceneKey);
        game.scene.manager.dump();
    }
}


