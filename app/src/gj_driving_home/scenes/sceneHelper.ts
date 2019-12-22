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

    public static switchToTutorialScene(game: Phaser.Scene) {
        game.scene.manager.stop("MenuScene");
        game.scene.manager.start("IntroScene");
        game.scene.manager.dump();
    }

    public static switchToCreditScene(game: Phaser.Scene) {
        game.scene.manager.stop("MenuScene");
        game.scene.manager.start("CreditScene");
        game.scene.manager.dump();
    }

    public static switchToMenuScene(game: Phaser.Scene) {
        game.scene.manager.stop("CreditScene");
        game.scene.manager.start("MenuScene");
        game.scene.manager.dump();
    }

    public static transitionScene(game: Phaser.Scene, sceneKey: SceneLoadingData): void {
        console.log("here we go again for "+ sceneKey.getKey());

        SoundController.getInstance().sound = game.sound;
        game.scene.manager.stop("MenuScene");
        game.scene.manager.stop("RacoonScene");
        game.scene.manager.stop('MainScene');
        game.scene.manager.start('LoadingScene', sceneKey);
        game.scene.manager.dump();
    }

    public static steeringScene(game: Phaser.Scene, sceneKey: SceneLoadingData): void {
        console.log("Steering scene ", sceneKey);
        game.scene.manager.stop('MainScene');
        game.scene.manager.dump();
        game.scene.manager.start('SteeringWheelScene', sceneKey);
        game.scene.manager.dump();

    }

    static switchToRaccoonScene(game: Phaser.Scene, sceneLoadingData: SceneLoadingData) {
        game.scene.manager.stop('MainScene');
        game.scene.manager.start('RacoonScene', sceneLoadingData);
    }
}


