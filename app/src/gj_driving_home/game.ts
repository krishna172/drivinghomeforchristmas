/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @license      Digitsensitive
 */

/// <reference path="../phaser.d.ts"/>

import "phaser";
import { MainScene } from "./scenes/mainScene";

// main game configuration
// main game configuration
const config: GameConfig = {

  width: 1280,
  height: 720,

  type: Phaser.AUTO,
  pixelArt: false,
  parent: "game",

  scene: [MainScene],
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
  var game = new Game(config);
};
