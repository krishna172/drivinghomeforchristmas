import {SceneLoader} from "./sceneLoader";
import {SceneDescription} from "../sceneDescription";
import {SceneHelper} from "./sceneHelper";
import {SceneLoadingData} from "./sceneLoadingData";
import {AssetGlobals} from "../assetsGlobals";
import Webcam from "../video";

export class CreditScene extends Phaser.Scene {

    private _sceneData: SceneLoadingData;

    constructor() {
        super({
            key: "CreditScene"
        });
    }

    preload(): void {
        console.log("preload credit scene")
        this.load.image("teamImage", "./assets/credits/side-by-side-colored.png");
    }

    create(): void {
        console.log("credit scene created")
        let teamImage = this.add.image(
            this.game.renderer.width / 4,
            0,
            "teamImage").setScale(0.25, 0.25);
        teamImage.setOrigin(0, 0);

        let teamNames = "Alladi Manikantanatha V. M. - internal affairs\n" +
            "Andreas Leibetseder - the voice of reason\n" +
            "Armin Lippitz - punching lines like punch lines\n" +
            "Christian Zellot - work force imported from Salzburg\n" +
            "Giovanni Liva - best Italian accent ever!\n" +
            "Josef Kümmel - scientific adviser for happiness and surprise\n" +
            "Lukas Knoch - one keyboard is not enough\n" +
            "Mathias Lux - never there when needed, but not needed anyway\n" +
            "Natascha Rauscher - arts and smarts \n" +
            "Nutalapati Lakshmi Sudeep - sounds and beats\n" +
            "Sabrina Kletz - Police Academy 2019\n" +
            "Veit Frick - Club Mate spokesperson";

        let teamText = this.add.text(this.game.renderer.width / 4,
            this.game.renderer.height / 2 + 25, teamNames, {font: '20px monospace'});
        teamText.setOrigin(0, 0);

        let musicMentions = "Silent Night (Snowflake and Martijn de Boer mix) by Speck\n" +
            "2019 - Licensed under Creative Commons Attribution Noncommercial (3.0)\n" +
            "I dunno by grapes\n" +
            "2008 - Licensed under Creative Commons Attribution (3.0)\n" +
            "The Storm by K\n" +
            "2019 - Licensed under Creative Commons Attribution Noncommercial (3.0)";

        let musicText = this.add.text(this.game.renderer.width / 4,
            this.game.renderer.height / 2 + 50 + teamText.height, musicMentions, {font: '20px monospace'});
        teamText.setOrigin(0, 0);

    }

}