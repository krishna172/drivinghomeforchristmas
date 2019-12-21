import {SceneLoader} from "./sceneLoader";
import {SceneDescription} from "../sceneDescription";
import {SceneHelper} from "./sceneHelper";
import {SceneLoadingData} from "./sceneLoadingData";
import {AssetGlobals} from "../assetsGlobals";
import Webcam from "../video";

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
        this.load.image(AssetGlobals.BTN_BG, "assets/buttons/"+AssetGlobals.BTN_BG+".png");
        this.load.image(AssetGlobals.BG_IMAGE_MENU, "./assets/backgrounds/"+AssetGlobals.BG_IMAGE_MENU+".png");
    }

    create(): void {
        console.log("menu scene created")
        this.cameras.main.setBackgroundColor("#FFFFFF");
        Webcam.getInstance().updateCamCanvas(this.textures);
        let image = this.add.image(
            this.game.renderer.width/2,
            0.54 * (this.game.renderer.height / 2),
            "webcam"
        );
        image.setOrigin(0.5, 0);
        image.setScale(0.7);
        image.flipX = true;


        this.add.image(
            this.game.renderer.width/2,
            this.game.renderer.height/2,
            AssetGlobals.BG_IMAGE_MENU);

        let centerX = this.game.renderer.width / 3.2;
        let centerY = 4 * (this.game.renderer.height / 5);


        let btnGap = (centerX / 3);
        let btnPlay = this.add.image(centerX, centerY, AssetGlobals.BTN_BG).setScale(0.5, 0.5);
        btnPlay.setVisible(true);
        btnPlay.setInteractive({useHandCursor: true});
        let btnPlayTxt = this.add.text(centerX, centerY, "Play", {font: '30px monospace'});
        btnPlayTxt.setOrigin(0.5,0.5);

        let btnPosSecond = centerX + (btnPlay.width / 2) + btnGap;
        let btnTutorial = this.add.image(btnPosSecond, centerY, AssetGlobals.BTN_BG).setScale(0.5, 0.5);
        btnTutorial.setVisible(true);
        btnTutorial.setInteractive({useHandCursor: true});
        let btnTutorialTxt = this.add.text(btnPosSecond, centerY, "Tutorial", {font: '30px monospace'});
        btnTutorialTxt.setOrigin(0.5,0.5);

        let btnPosThird = centerX + (btnPlay.width) + (btnGap * 2);
        let btnCredits = this.add.image(btnPosThird, centerY, AssetGlobals.BTN_BG).setScale(0.5, 0.5);
        btnCredits.setVisible(true);
        btnCredits.setInteractive({useHandCursor: true});
        let btnCreditsTxt = this.add.text(btnPosThird, centerY, "Credits", {font: '30px monospace'});
        btnCreditsTxt.setOrigin(0.5,0.5);

        btnPlay.on("pointerup", () => {
            SceneHelper.transitionScene(this, new SceneLoadingData("scene0"));

        });

        btnCredits.on("pointerup", () => {
            console.log("creditsbutton pressed");

        });

        btnTutorial.on("pointerup", () => {
            SceneHelper.switchToTutorialScene(this);

        });

        let game = this;
        this.input.keyboard.on("keydown_X", function (event) {
            game.sound.stopAll();
            SceneHelper.transitionScene(game,new SceneLoadingData("scene0"));
        });

    }

}