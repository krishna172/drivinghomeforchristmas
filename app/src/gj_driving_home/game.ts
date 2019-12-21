/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @license      Digitsensitive
 */

/// <reference path="../phaser.d.ts"/>
import "phaser";
import {MainScene} from "./scenes/mainScene";
import {LoadingScene} from "./scenes/loadingScene";
import GameConfig = Phaser.Types.Core.GameConfig;

// main game configuration
// main game configuration
const config: GameConfig = {

    width: 1920,
    height: 1080,

    type: Phaser.AUTO,
    parent: "game",

    scene: [LoadingScene, MainScene],
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 0,},
        }
    }
};

// game class
export class Game extends Phaser.Game {
    constructor(config: GameConfig) {
        super(config);
    }
}

// when the page is loaded, create our game instance
window.onload = () => {
    const game = new Game(config);
};

