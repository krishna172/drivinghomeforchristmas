import {SceneLoadingData} from "./sceneLoadingData";

export class SceneHelper {

    public static switchToMainScreen(scene: Phaser.Scenes.SceneManager): void {
        console.log("here we go again!");
        scene.start('MainScene');
        scene.stop('LoadingScene');
        scene.dump();
    }

    public static transitionScene(game: Phaser.Scene, sceneKey: SceneLoadingData): void {
        console.log("here we go again for "+ sceneKey);
        //game.sound.stopAll();
        game.scene.manager.stop('MainScene');
        game.scene.manager.start('LoadingScene', sceneKey);
        game.scene.manager.dump();
    }
}


