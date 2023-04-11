import playerPNG from "../assets/player-walking.png";
import groundPNG from "../assets/ground.png";

const gameWidth = window.innerWidth;
const gameHeight = window.innerHeight;

const playerSpeed = 800;

let player;
let score = 0;
let scoreText = "";

function idle(prevVelocity) {
  player.body.setVelocity(0);
  player.anims.stop();
  player.body.setVelocityY(playerSpeed);
  if (prevVelocity.x < 0) player.setTexture("player", "walk");
  else if (prevVelocity.x > 0) player.setTexture("player", "walk");
  // else if (prevVelocity.y < 0) player.setTexture("player", "back");
  // else if (prevVelocity.y > 0) player.setTexture("player", "front");
}

function left() {
  player.flipX = true;
  player.anims.play("walk", true);
  player.body.setVelocityX(-playerSpeed);
}

function right() {
  player.flipX = false;
  player.anims.play("walk", true);
  player.body.setVelocityX(playerSpeed);
}

function jump() {
  player.body.setVelocityY(-3000);
}

export default class GameScene {
  constructor() {}

  preload() {
    this.load.image("ground", groundPNG);
    this.load.spritesheet("player", playerPNG, {
      frameWidth: 291,
      frameHeight: 291,
    });
  }

  create() {
    player = this.physics.add.sprite(140, 0, "player");
    player.setCollideWorldBounds(true);
    const platforms = this.physics.add.staticGroup();
    const ground = platforms.create(960, 920, "ground").refreshBody();

    this.physics.add.collider(player, ground);

    this.cameras.main.setBackgroundColor("0x87ceeb");
    scoreText = this.add.text(40, 40, score, {
      fontFamily: '"04b19"',
      fontSize: 60,
      color: "#fff",
    });

    const anims = this.anims;
    anims.create({
      key: "walk",
      frames: anims.generateFrameNames("player", { start: 0, end: 19 }),
      frameRate: 14,
      repeat: -1,
    });

    const camera = this.cameras.main;
    camera.setBounds(0, 0, gameWidth, gameHeight);
    camera.startFollow(player);
  }

  update(time, delta) {
    const prevVelocity = player.body.velocity.clone();
    const movement = this.input.keyboard.createCursorKeys();

    this.input.keyboard.on("keydown-" + "SPACE", jump);
    this.input.on("pointerdown", jump);
    if (movement.left.isDown) {
      left();
    } else if (movement.right.isDown) {
      right();
    } else {
      idle(prevVelocity);
    }
    // if (movement.up.isDown) {
    //   player.body.setVelocityY(-1000);
    //   score += 1;
    //   scoreText.setText(score);
    // }
    // if (movement.down.isDown) {
    //   player.body.setVelocityY(400);
    //   score -= 1;
    //   scoreText.setText(score);
    // }
  }
}
