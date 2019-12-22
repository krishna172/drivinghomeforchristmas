/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @license      Digitsensitive
 */

/// <reference path="../phaser.d.ts"/>
import "phaser";
import {MainScene} from "./scenes/mainScene";
import {LoadingScene} from "./scenes/loadingScene";
import {MenuScene} from "./scenes/menuScene";
import {SteeringWheelScene} from "./scenes/steeringwheelScene";
import GameConfig = Phaser.Types.Core.GameConfig;

import * as canvas from 'canvas';
import * as faceapi from 'face-api.js';
import Webcam from "./video";
import {IntroScene} from "./scenes/IntroScene";
import {RacoonScene} from "./scenes/racoonScene";

const {Canvas, Image, ImageData} = canvas;

// main game configuration
// main game configurationv
const config: GameConfig = {

    width: 1920,
    height: 1080,

    type: Phaser.AUTO,
    parent: "game",

    scene: [MenuScene, IntroScene, LoadingScene, MainScene,RacoonScene,SteeringWheelScene],
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 0,},
        }
    }};

// game class
export class Game extends Phaser.Game {
    constructor(config: GameConfig) {
        super(config);
    }

}

// when the page is loaded, create our game instance
window.onload = async () => {
    await Webcam.init();
    const game = new Game(config);
};

