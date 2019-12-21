import {SceneLoader} from "./sceneLoader";
import {SceneDescription} from "../sceneDescription";
import {SceneHelper} from "./sceneHelper";
import {SceneLoadingData} from "./sceneLoadingData";

export class MenuScene extends Phaser.Scene {

    private _sceneData: SceneLoadingData;
    constructor() {
        super({
            key: "MenuScene"
        });
    }

    init(data): void {
        console.log('init menu', data);
        this._sceneData = data;
        if (!this._sceneData.key) {
            this._sceneData.key = "sceneMenu"
        }
    }

    preload(): void {
        console.log("preload menu scene")
        this.load.image('btnBgTaxi', 'assets/buttons/btn_bg_taxi.png');
    }

    create(): void {
        console.log("menu scene created")
        let centerX = this.game.renderer.width / 3;
        let centerY = 4 * (this.game.renderer.height / 5);
        let btnGap = (centerX / 3);

        let btnPlay = this.add.image(centerX, centerY, 'btnBgTaxi').setScale(0.5, 0.5);
        btnPlay.setVisible(true);
        btnPlay.setInteractive({useHandCursor: true});
        let btnPlayTxt = this.add.text(centerX, centerY, "Play", {font: '30px monospace'});
        btnPlayTxt.setOrigin(0.5,0.5);

        let btnPosSecond = centerX + (btnPlay.width / 2) + btnGap;
        let btnTutorial = this.add.image(btnPosSecond, centerY, 'btnBgTaxi').setScale(0.5, 0.5);
        btnTutorial.setVisible(true);
        btnTutorial.setInteractive({useHandCursor: true});
        let btnTutorialTxt = this.add.text(btnPosSecond, centerY, "Tutorial", {font: '30px monospace'});
        btnTutorialTxt.setOrigin(0.5,0.5);

        let btnPosThird = centerX + (btnPlay.width) + (btnGap * 2);
        let btnCredits = this.add.image(btnPosThird, centerY, 'btnBgTaxi').setScale(0.5, 0.5);
        btnCredits.setVisible(true);
        btnCredits.setInteractive({useHandCursor: true});
        let btnCreditsTxt = this.add.text(btnPosThird, centerY, "Credits", {font: '30px monospace'});
        btnCreditsTxt.setOrigin(0.5,0.5);

        btnPlay.on("pointerup", () => {
            console.log("playbutton pressed");

        });

        btnCredits.on("pointerup", () => {
            console.log("creditsbutton pressed");

        });

        btnTutorial.on("pointerup", () => {
            console.log("tutorialbutton pressed");

        });

        let game = this;
        this.input.keyboard.on("keydown_X", function (event) {
            game.sound.stopAll();
            SceneHelper.transitionScene(game,new SceneLoadingData("scene0"));
        });

    }


}