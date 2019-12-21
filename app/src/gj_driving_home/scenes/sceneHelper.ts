export class SceneHelper {

    public static switchToMainScreen(scene: Phaser.Scenes.SceneManager): void {
        console.log("here we go again!");
        scene.start('MainScene');
        scene.stop('LoadingScene');
        scene.dump();
    }
}