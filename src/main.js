import "../style.css";
import { Game, WEBGL } from "phaser";
import GameScene from "./scenes/game";

const gameWidth = window.innerWidth;
const gameHeight = window.innerHeight;

const canvas = document.getElementById("game");

const config = {
  type: WEBGL,
  width: gameWidth,
  height: gameHeight,
  canvas,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 20000 },
      // debug: true
    },
  },
  scene: [GameScene],
};

new Game(config);
