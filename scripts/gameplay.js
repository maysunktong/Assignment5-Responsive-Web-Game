import { imagePlatforms } from "./imagePlatforms.js";
import { objects } from "./objects.js";
import { sprites } from "./sprites.js";
import { collisionTop, createBlock, isOnTop } from "./utils.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1280;
canvas.height = 720;

const gravity = 0.5;

class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };

    this.width = 128;
    this.height = 128;
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.speed = 10;

    this.image = sprites.swordsman.idle.right;
    this.currentSprite = sprites.swordsman.idle.right;

    this.sprites = sprites;

    this.frames = 0;
    this.frameInterval = 10;
    this.frameTimer = 0;

    this.jumpCount = 0;

    this.score = 0;
  }

  draw() {
    ctx.drawImage(
      this.currentSprite,
      this.width * this.frames,
      0,
      this.width,
      this.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`Score: ${this.score}`, canvas.width - 150, 50);
  }

  update() {
    this.frameTimer++;
    if (this.frameTimer % this.frameInterval === 0) {
      this.frames++;
      if (this.frames > this.image.width / this.height - 1) {
        this.frames = 0;
      }
    }
    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    } else {
      this.jumpCount = 0;
    }
  }
}

class Enemy {
  constructor({
    position,
    velocity,
    distance = {
      limit: 100,
      traveled: 0,
    },
    image,
    state,
  }) {
    this.position = {
      x: position.x,
      y: position.y,
    };

    this.velocity = {
      x: velocity.x,
      y: velocity.y,
    };

    this.image = image;
    this.width = 128;
    this.height = 128;

    this.frames = 0;
    this.frameInterval = 10;
    this.frameTimer = 0;

    this.sprites = 0;

    this.state = state;

    this.distance = distance;
  }

  draw() {
    ctx.drawImage(
      this.image,
      this.width * this.frames,
      0,
      this.width,
      this.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.frameTimer++;
    if (this.frameTimer % this.frameInterval === 0) {
      this.frames++;
      if (this.frames > this.image.width / this.height - 1) {
        this.frames = 0;
      }
    }
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    }

    // walk the goomba back and forth
    this.distance.traveled += Math.abs(this.velocity.x);

    if (this.distance.traveled > this.distance.limit) {
      this.distance.traveled = 0;
      this.velocity.x = -this.velocity.x;
      if (this.state === "walk") {
        this.image =
          this.image === sprites.werewolf.walk.left
            ? sprites.werewolf.walk.right
            : sprites.werewolf.walk.left;
      } else if (this.state === "attack") {
        this.image =
          this.image === sprites.werewolf.attack.left
            ? sprites.werewolf.attack.right
            : sprites.werewolf.attack.left;
      } else if (this.state === "run") {
        this.image =
          this.image === sprites.werewolf.run.left
            ? sprites.werewolf.run.right
            : sprites.werewolf.run.left;
      }
    }
  }
}

class Platform {
  constructor({ x, y, image, block }) {
    this.position = {
      x,
      y,
    };
    this.image = image;
    this.width = image.width;
    this.height = image.height;

    this.velocity = {
      x: 0,
    };

    this.block = block;
  }

  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
  }
}

class GenericObject {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }

  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }
}

class Background {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }

  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }
}

class Explosion {
  constructor({ position, velocity, image }) {
    this.position = {
      x: position.x,
      y: position.y,
    };

    this.velocity = {
      x: velocity.x,
      y: velocity.y,
    };

    this.width = 200;
    this.height = 200;

    this.image = image;

    this.frames = 0;
    this.frameInterval = 10;
    this.frameTimer = 0;
  }

  draw() {
    ctx.drawImage(
      this.image,
      760 * this.frames,
      0,
      760,
      760,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.frameTimer++;
    if (this.frameTimer % this.frameInterval === 0) {
      this.frames++;
      if (this.frames >= this.image.width / 760) {
        this.frames = 0;
      }
    }
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

class Collectible {
  constructor({ position, velocity, image, value = 1, type = "coin" }) {
    this.position = {
      x: position.x,
      y: position.y,
    };

    this.velocity = {
      x: velocity.x,
      y: velocity.y,
    };

    this.width = 32;
    this.height = 32;

    this.image = image;
    this.type = type;
    this.value = value;

    this.frames = 0;
    this.frameInterval = 10;
    this.frameTimer = 0;
  }

  draw() {
    ctx.drawImage(
      this.image,
      16 * this.frames,
      0,
      16,
      16,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.frameTimer++;
    if (this.frameTimer % this.frameInterval === 0) {
      this.frames++;
      if (this.frames > this.image.width / this.height - 1) {
        this.frames = 0;
      }
    }
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

/* declare variables for init() */
let player = new Player();
let platforms = [];
let genericObjects = [];
let backgrounds = [];
let enemies = [];
let explosions = [];
let collectibles = [];
let score = 0;

let lastKey;
let keys;
let scrollOffset;

// initializing Level 1
async function init() {
  keys = {
    right: {
      pressed: false,
    },
    left: {
      pressed: false,
    },
  };

  player = new Player();

  scrollOffset = 0;

  for (let i = 0; i < 7; i++) {
    backgrounds.push(
      new Background({
        x: i * objects.backgrounds.forest.width,
        y: 0,
        image: objects.backgrounds.forest,
      })
    );
  }

  for (let i = 7; i < 15; i++) {
    backgrounds.push(
      new Background({
        x: i * objects.backgrounds.desert.width,
        y: 0,
        image: objects.backgrounds.desert,
      })
    );
  }

  enemies = [
    new Enemy({
      position: { x: 700, y: 100 },
      velocity: { x: -0.5, y: 0 },
      image: sprites.werewolf.walk.left,
      state: "walk",
    }),
    new Enemy({
      position: { x: 1700, y: 100 },
      velocity: { x: 0.5, y: 0 },
      image: sprites.werewolf.walk.right,
      state: "walk",
    }),
    new Enemy({
      position: { x: 2200, y: 100 },
      velocity: { x: -0.5, y: 0 },
      image: sprites.werewolf.walk.left,
      state: "walk",
    }),
    new Enemy({
      position: { x: 4700, y: 100 },
      velocity: { x: -0.5, y: 0 },
      image: sprites.werewolf.walk.left,
      state: "walk",
    }),
    new Enemy({
      position: { x: 5600, y: 100 },
      velocity: { x: -0.5, y: 0 },
      image: sprites.werewolf.walk.left,
      state: "walk",
    }),
    ,
    new Enemy({
      position: { x: 10000 + 1500, y: 100 },
      velocity: { x: -1.5, y: 0 },
      distance: { limit: 300, traveled: 0 },
      image: sprites.werewolf.run.left,
      state: "run",
    }),
    new Enemy({
      position: { x: 10000 + 2300, y: 100 },
      velocity: { x: -1.5, y: 0 },
      distance: { limit: 300, traveled: 0 },
      image: sprites.werewolf.run.left,
      state: "run",
    }),
    new Enemy({
      position: { x: 10000 + 4000, y: 100 },
      velocity: { x: -1.5, y: 0 },
      distance: { limit: 200, traveled: 0 },
      image: sprites.werewolf.run.left,
      state: "run",
    }),
    new Enemy({
      position: { x: 10000 + 4800, y: 100 },
      velocity: { x: -1.5, y: 0 },
      distance: { limit: 200, traveled: 0 },
      image: sprites.werewolf.run.left,
      state: "run",
    }),
    new Enemy({
      position: { x: 10000 + 5100, y: 100 },
      velocity: { x: 1.5, y: 0 },
      distance: { limit: 300, traveled: 0 },
      image: sprites.werewolf.run.right,
      state: "run",
    }),
    new Enemy({
      position: { x: 10000 + 6500, y: 100 },
      velocity: { x: 1.5, y: 0 },
      distance: { limit: 300, traveled: 0 },
      image: sprites.werewolf.run.right,
      state: "run",
    }),
    new Enemy({
      position: { x: 10000 + 7300, y: 100 },
      velocity: { x: 1.5, y: 0 },
      distance: { limit: 200, traveled: 0 },
      image: sprites.werewolf.run.right,
      state: "run",
    }),
    new Enemy({
      position: { x: 10000 + 8200, y: 100 },
      velocity: { x: -1.5, y: 0 },
      distance: { limit: 200, traveled: 0 },
      image: sprites.werewolf.run.left,
      state: "run",
    }),
  ];

  platforms = [
    new Platform({
      x: 0,
      y: 600,
      image: imagePlatforms.level1.pmd,
    }),
    new Platform({
      x: imagePlatforms.level1.pmd.width + 200,
      y: 600,
      image: imagePlatforms.level1.tpmd,
    }),
    new Platform({
      x:
        imagePlatforms.level1.pmd.width +
        200 +
        imagePlatforms.level1.tpmd.width +
        200,
      y: 500,
      image: imagePlatforms.level1.bsm,
    }),
    new Platform({
      x:
        imagePlatforms.level1.pmd.width +
        200 +
        imagePlatforms.level1.tpmd.width +
        200 +
        imagePlatforms.level1.bsm.width +
        200,
      y: 400,
      image: imagePlatforms.level1.bmd,
    }),
    new Platform({
      x:
        imagePlatforms.level1.pmd.width +
        200 +
        imagePlatforms.level1.tpmd.width +
        200 +
        imagePlatforms.level1.bsm.width +
        200 +
        imagePlatforms.level1.bmd.width +
        200,
      y: 500,
      image: imagePlatforms.level1.bsm,
    }),
    new Platform({
      x:
        imagePlatforms.level1.pmd.width +
        200 +
        imagePlatforms.level1.tpmd.width +
        200 +
        imagePlatforms.level1.bsm.width +
        200 +
        imagePlatforms.level1.bmd.width +
        200 +
        imagePlatforms.level1.bsm.width +
        200,
      y: 500,
      image: imagePlatforms.level1.tpplg,
    }),
    new Platform({
      x:
        imagePlatforms.level1.pmd.width +
        200 +
        imagePlatforms.level1.tpmd.width +
        200 +
        imagePlatforms.level1.bsm.width +
        200 +
        imagePlatforms.level1.bmd.width +
        200 +
        imagePlatforms.level1.bsm.width +
        200 +
        imagePlatforms.level1.tpplg.width +
        200,
      y: 600,
      image: imagePlatforms.level1.tpmd,
    }),
    new Platform({
      x:
        imagePlatforms.level1.pmd.width +
        200 +
        imagePlatforms.level1.tpmd.width +
        200 +
        imagePlatforms.level1.bsm.width +
        200 +
        imagePlatforms.level1.bmd.width +
        200 +
        imagePlatforms.level1.bsm.width +
        200 +
        imagePlatforms.level1.tpplg.width +
        200 +
        imagePlatforms.level1.tpmd.width +
        200,
      y: 600,
      image: imagePlatforms.level1.plg,
    }),
    new Platform({
      x: 500,
      y: 300,
      image: imagePlatforms.level2.barwood,
      block: true,
    }),
    new Platform({
      x: 1000,
      y: 350,
      image: imagePlatforms.level2.barbox,
      block: true,
    }),
    new Platform({
      x:
        10000 +
        imagePlatforms.level1.pmd.width +
        200 +
        imagePlatforms.level1.sm,
      y: 350,
      image: imagePlatforms.level2.barbox,
      block: true,
    }),
    ,
    new Platform({
      x: 10000,
      y: 600,
      image: imagePlatforms.level2.plg,
    }),
    new Platform({
      x: 10000 + imagePlatforms.level2.plg.width,
      y: 400,
      image: imagePlatforms.level2.barwood,
      block: true,
    }),
    new Platform({
      x:
        10000 +
        imagePlatforms.level2.plg.width +
        imagePlatforms.level2.barwood.width +
        100,
      y: 300,
      image: imagePlatforms.level2.barwood,
      block: true,
    }),
    new Platform({
      x:
        10000 +
        imagePlatforms.level2.plg.width +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100,
      y: 200,
      image: imagePlatforms.level2.barwood,
      block: true,
    }),
    new Platform({
      x:
        10000 +
        imagePlatforms.level2.plg.width +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100,
      y: 350,
      image: imagePlatforms.level2.barwood,
      block: true,
    }),
    new Platform({
      x:
        10000 +
        imagePlatforms.level2.plg.width +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100,
      y: 600,
      image: imagePlatforms.level2.pmd,
    }),
    new Platform({
      x:
        10000 +
        imagePlatforms.level2.plg.width +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.pmd.width +
        300,
      y: 400,
      image: imagePlatforms.level2.sm,
    }),
    new Platform({
      x:
        10000 +
        imagePlatforms.level2.plg.width +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.pmd.width +
        300 +
        imagePlatforms.level2.sm.width +
        300,
      y: 400,
      image: imagePlatforms.level2.sm,
    }),
    new Platform({
      x:
        10000 +
        imagePlatforms.level2.plg.width +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.pmd.width +
        300 +
        imagePlatforms.level2.sm.width +
        300 +
        imagePlatforms.level2.sm.width +
        300,
      y: 600,
      image: imagePlatforms.level2.plg,
    }),
    new Platform({
      x:
        10000 +
        imagePlatforms.level2.plg.width +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.pmd.width +
        300 +
        imagePlatforms.level2.sm.width +
        300 +
        imagePlatforms.level2.sm.width +
        300 +
        imagePlatforms.level2.plg.width,
      y: 600,
      image: imagePlatforms.level2.pmd,
    }),
    new Platform({
      x: 10000 + 500,
      y: 300,
      image: imagePlatforms.level2.barbox,
      block: true,
    }),
    new Platform({
      x: 10000 + 900,
      y: 300,
      image: imagePlatforms.level2.barboxlong,
      block: true,
    }),
    new Platform({
      x: 10000 + 1500,
      y: 200,
      image: imagePlatforms.level2.barboxlong,
      block: true,
    }),
    new Platform({
      x: 10000 + imagePlatforms.level2.plg.width + 400,
      y: 600,
      image: imagePlatforms.level2.sm,
    }),
    new Platform({
      x:
        10000 +
        imagePlatforms.level2.plg.width +
        300 +
        imagePlatforms.level2.sm.width +
        300,
      y: 600,
      image: imagePlatforms.level2.sm,
    }),
    new Platform({
      x:
        10000 +
        imagePlatforms.level2.plg.width +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100,
      y: 200,
      image: imagePlatforms.level2.barboxlong,
      block: true,
    }),
    new Platform({
      x:
        10000 +
        imagePlatforms.level2.plg.width +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barboxlong.width +
        200,
      y: 200,
      image: imagePlatforms.level2.barbox,
      block: true,
    }),
    new Platform({
      x:
        10000 +
        imagePlatforms.level2.plg.width +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barboxlong.width +
        200 +
        imagePlatforms.level2.barbox.width +
        200,
      y: 200,
      image: imagePlatforms.level2.barboxlong,
      block: true,
    }),
    new Platform({
      x:
        10000 +
        imagePlatforms.level2.plg.width +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.pmd.width +
        200 +
        imagePlatforms.level2.sm.width +
        200 +
        imagePlatforms.level2.sm.width +
        200 +
        imagePlatforms.level2.barbox.width,
      y: 250,
      image: imagePlatforms.level2.barbox,
      block: true,
    }),
    new Platform({
      x:
        10000 +
        imagePlatforms.level2.plg.width +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.pmd.width +
        200 +
        imagePlatforms.level2.sm.width +
        200 +
        imagePlatforms.level2.sm.width +
        200 +
        imagePlatforms.level2.barbox.width +
        200 +
        imagePlatforms.level2.barbox.width,
      y: 250,
      image: imagePlatforms.level2.barbox,
      block: true,
    }),
  ];

  genericObjects = [
    new GenericObject({ x: 0, y: 200, image: objects.trees.green1 }),
    new GenericObject({
      x: objects.trees.green1.width + 300,
      y: 200,
      image: objects.trees.green3,
    }),
    new GenericObject({
      x: objects.trees.green1.width + 300 + objects.trees.green3.width + 200,
      y: 200,
      image: objects.trees.green2,
    }),
    new GenericObject({
      x:
        objects.trees.green1.width +
        300 +
        objects.trees.green3.width +
        200 +
        objects.trees.green2.width +
        200,
      y: 200,
      image: objects.trees.green3,
    }),
    new GenericObject({
      x:
        objects.trees.green1.width +
        300 +
        objects.trees.green3.width +
        200 +
        objects.trees.green2.width +
        200 +
        objects.trees.green3.width +
        300,
      y: 200,
      image: objects.trees.green2,
    }),
    new GenericObject({
      x:
        objects.trees.green1.width +
        300 +
        objects.trees.green3.width +
        200 +
        objects.trees.green2.width +
        200 +
        objects.trees.green3.width +
        300 +
        objects.trees.green2.width +
        500,
      y: 150,
      image: objects.trees.green3,
    }),
    new GenericObject({
      x:
        objects.trees.green1.width +
        300 +
        objects.trees.green3.width +
        200 +
        objects.trees.green2.width +
        200 +
        objects.trees.green3.width +
        300 +
        objects.trees.green2.width +
        500 +
        objects.trees.green3.width +
        300,
      y: 250,
      image: objects.trees.brown1,
    }),
    new GenericObject({
      x:
        objects.trees.green1.width +
        300 +
        objects.trees.green3.width +
        200 +
        objects.trees.green2.width +
        200 +
        objects.trees.green3.width +
        300 +
        objects.trees.green2.width +
        500 +
        objects.trees.green3.width +
        300 +
        objects.trees.brown1.width +
        300,
      y: 250,
      image: objects.trees.brown2,
    }),
    new GenericObject({
      x:
        objects.trees.green1.width +
        300 +
        objects.trees.green3.width +
        200 +
        objects.trees.green2.width +
        200 +
        objects.trees.green3.width +
        300 +
        objects.trees.green2.width +
        500 +
        objects.trees.green3.width +
        300 +
        objects.trees.brown1.width +
        300 +
        objects.trees.brown2.width +
        500,
      y: 200,
      image: objects.trees.brown3,
    }),
  ];

  collectibles = [
    new Collectible({
      position: { x: 300, y: 300 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.coins,
      value: 10,
      type: "coin",
    }),
    new Collectible({
      position: { x: 400, y: 300 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.coins,
      value: 10,
      type: "coin",
    }),
    new Collectible({
      position: { x: 700, y: 200 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.coins,
      value: 10,
      type: "coin",
    }),
    new Collectible({
      position: { x: 800, y: 200 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.coins,
      value: 10,
      type: "coin",
    }),
    new Collectible({
      position: { x: 900, y: 200 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.coins,
      value: 10,
      type: "coin",
    }),
    new Collectible({
      position: { x: 1200, y: 100 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.greenRunes,
      value: 10,
      type: "green",
    }),
    new Collectible({
      position: { x: 1300, y: 100 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.greenRunes,
      value: 10,
      type: "green",
    }),
    new Collectible({
      position: { x: 1400, y: 100 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.greenRunes,
      value: 10,
      type: "green",
    }),

    new Collectible({
      position: { x: 2600, y: 200 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.coins,
      value: 10,
      type: "coin",
    }),
    new Collectible({
      position: { x: 2650, y: 200 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.coins,
      value: 10,
      type: "coin",
    }),
    new Collectible({
      position: { x: 2700, y: 200 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.coins,
      value: 10,
      type: "coin",
    }),
    new Collectible({
      position: { x: 3400, y: 100 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.redRunes,
      value: 10,
      type: "red",
    }),
    new Collectible({
      position: { x: 3500, y: 100 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.redRunes,
      value: 10,
      type: "red",
    }),
    new Collectible({
      position: { x: 3600, y: 100 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.diamonds,
      value: 10,
      type: "diamond",
    }),
    new Collectible({
      position: { x: 4600, y: 400 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.diamonds,
      value: 10,
      type: "diamond",
    }),
    new Collectible({
      position: { x: 4700, y: 400 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.diamonds,
      value: 10,
      type: "diamond",
    }),
    new Collectible({
      position: { x: 4800, y: 400 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.diamonds,
      value: 10,
      type: "diamond",
    }),
    new Collectible({
      position: { x: 10000 + 300, y: 300 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.coins,
      value: 10,
      type: "coin",
    }),
    new Collectible({
      position: { x: 10000 + 400, y: 300 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.coins,
      value: 10,
      type: "coin",
    }),
    new Collectible({
      position: { x: 10000 + 700, y: 200 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.coins,
      value: 10,
      type: "coin",
    }),
    new Collectible({
      position: { x: 10000 + 800, y: 200 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.coins,
      value: 10,
      type: "coin",
    }),
    new Collectible({
      position: { x: 10000 + 900, y: 200 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.coins,
      value: 10,
      type: "coin",
    }),
    new Collectible({
      position: { x: 10000 + 1200, y: 100 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.greenRunes,
      value: 10,
      type: "green",
    }),
    new Collectible({
      position: { x: 10000 + 1300, y: 100 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.greenRunes,
      value: 10,
      type: "green",
    }),
    new Collectible({
      position: { x: 10000 + 1400, y: 100 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.greenRunes,
      value: 10,
      type: "green",
    }),

    new Collectible({
      position: { x: 10000 + 2600, y: 200 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.coins,
      value: 10,
      type: "coin",
    }),
    new Collectible({
      position: { x: 10000 + 2650, y: 200 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.coins,
      value: 10,
      type: "coin",
    }),
    new Collectible({
      position: { x: 10000 + 2700, y: 200 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.coins,
      value: 10,
      type: "coin",
    }),
    new Collectible({
      position: { x: 10000 + 3400, y: 100 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.redRunes,
      value: 10,
      type: "red",
    }),
    new Collectible({
      position: { x: 10000 + 3500, y: 100 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.redRunes,
      value: 10,
      type: "red",
    }),
    new Collectible({
      position: { x: 10000 + 3600, y: 100 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.diamonds,
      value: 10,
      type: "diamond",
    }),
    new Collectible({
      position: { x: 10000 + 4600, y: 400 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.diamonds,
      value: 10,
      type: "diamond",
    }),
    new Collectible({
      position: { x: 10000 + 4700, y: 400 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.diamonds,
      value: 10,
      type: "diamond",
    }),
    new Collectible({
      position: { x: 10000 + 4800, y: 400 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.diamonds,
      value: 10,
      type: "diamond",
    }),
    new Collectible({
      position: { x: 10000 + 4300, y: 100 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.coins,
      value: 10,
      type: "coin",
    }),
    new Collectible({
      position: { x: 10000 + 4400, y: 100 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.coins,
      value: 10,
      type: "coin",
    }),
    new Collectible({
      position: { x: 10000 + 4500, y: 100 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.coins,
      value: 10,
      type: "coin",
    }),
    new Collectible({
      position: { x: 10000 + 5300, y: 100 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.diamonds,
      value: 10,
      type: "diamond",
    }),
    new Collectible({
      position: { x: 10000 + 5400, y: 100 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.greenRunes,
      value: 10,
      type: "green",
    }),
    new Collectible({
      position: { x: 10000 + 5500, y: 100 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.redRunes,
      value: 10,
      type: "red",
    }),
    new Collectible({
      position: { x: 10000 + 6400, y: 100 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.coins,
      value: 10,
      type: "coin",
    }),
    new Collectible({
      position: { x: 10000 + 6500, y: 100 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.coins,
      value: 10,
      type: "coin",
    }),
    new Collectible({
      position: { x: 10000 + 6600, y: 100 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.coins,
      value: 10,
      type: "coin",
    }),
    new Collectible({
      position: { x: 10000 + 7300, y: 100 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.greenRunes,
      value: 10,
      type: "green",
    }),
    new Collectible({
      position: { x: 10000 + 7400, y: 100 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.redRunes,
      value: 10,
      type: "red",
    }),
    new Collectible({
      position: { x: 10000 + 7500, y: 100 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.redRunes,
      value: 10,
      type: "red",
    }),
  ];
}

// initializing Level 2
async function initLevel2() {
  for (let i = 0; i < 10; i++) {
    backgrounds.push(
      new Background({
        x: i * objects.backgrounds.desert.width,
        y: 0,
        image: objects.backgrounds.desert,
      })
    );
  }

  // enemies = [
  //   new Enemy({
  //     position: { x: 1500, y: 100 },
  //     velocity: { x: -1.5, y: 0 },
  //     distance: { limit: 300, traveled: 0 },
  //     image: sprites.werewolf.run.left,
  //     state: "run",
  //   }),
  //   new Enemy({
  //     position: { x: 2300, y: 100 },
  //     velocity: { x: -1.5, y: 0 },
  //     distance: { limit: 300, traveled: 0 },
  //     image: sprites.werewolf.run.left,
  //     state: "run",
  //   }),
  //   new Enemy({
  //     position: { x: 4000, y: 100 },
  //     velocity: { x: -1.5, y: 0 },
  //     distance: { limit: 200, traveled: 0 },
  //     image: sprites.werewolf.run.left,
  //     state: "run",
  //   }),
  //   new Enemy({
  //     position: { x: 4800, y: 100 },
  //     velocity: { x: -1.5, y: 0 },
  //     distance: { limit: 200, traveled: 0 },
  //     image: sprites.werewolf.run.left,
  //     state: "run",
  //   }),
  //   new Enemy({
  //     position: { x: 5100, y: 100 },
  //     velocity: { x: 1.5, y: 0 },
  //     distance: { limit: 300, traveled: 0 },
  //     image: sprites.werewolf.run.right,
  //     state: "run",
  //   }),
  //   new Enemy({
  //     position: { x: 6500, y: 100 },
  //     velocity: { x: 1.5, y: 0 },
  //     distance: { limit: 300, traveled: 0 },
  //     image: sprites.werewolf.run.right,
  //     state: "run",
  //   }),
  //   new Enemy({
  //     position: { x: 7300, y: 100 },
  //     velocity: { x: 1.5, y: 0 },
  //     distance: { limit: 200, traveled: 0 },
  //     image: sprites.werewolf.run.right,
  //     state: "run",
  //   }),
  //   new Enemy({
  //     position: { x: 8200, y: 100 },
  //     velocity: { x: -1.5, y: 0 },
  //     distance: { limit: 200, traveled: 0 },
  //     image: sprites.werewolf.run.left,
  //     state: "run",
  //   }),
  // ];

  // platforms = [
  //   new Platform({
  //     x: 0,
  //     y: 600,
  //     image: imagePlatforms.level2.plg,
  //   }),
  //   new Platform({
  //     x: imagePlatforms.level2.plg.width,
  //     y: 400,
  //     image: imagePlatforms.level2.barwood,
  //     block: true,
  //   }),
  //   new Platform({
  //     x:
  //       imagePlatforms.level2.plg.width +
  //       imagePlatforms.level2.barwood.width +
  //       100,
  //     y: 300,
  //     image: imagePlatforms.level2.barwood,
  //     block: true,
  //   }),
  //   new Platform({
  //     x:
  //       imagePlatforms.level2.plg.width +
  //       imagePlatforms.level2.barwood.width +
  //       100 +
  //       imagePlatforms.level2.barwood.width +
  //       100,
  //     y: 200,
  //     image: imagePlatforms.level2.barwood,
  //     block: true,
  //   }),
  //   new Platform({
  //     x:
  //       imagePlatforms.level2.plg.width +
  //       imagePlatforms.level2.barwood.width +
  //       100 +
  //       imagePlatforms.level2.barwood.width +
  //       100 +
  //       imagePlatforms.level2.barwood.width +
  //       100,
  //     y: 350,
  //     image: imagePlatforms.level2.barwood,
  //     block: true,
  //   }),
  //   new Platform({
  //     x:
  //       imagePlatforms.level2.plg.width +
  //       imagePlatforms.level2.barwood.width +
  //       100 +
  //       imagePlatforms.level2.barwood.width +
  //       100 +
  //       imagePlatforms.level2.barwood.width +
  //       100 +
  //       imagePlatforms.level2.barwood.width +
  //       100,
  //     y: 600,
  //     image: imagePlatforms.level2.pmd,
  //   }),
  //   new Platform({
  //     x:
  //       imagePlatforms.level2.plg.width +
  //       imagePlatforms.level2.barwood.width +
  //       100 +
  //       imagePlatforms.level2.barwood.width +
  //       100 +
  //       imagePlatforms.level2.barwood.width +
  //       100 +
  //       imagePlatforms.level2.barwood.width +
  //       100 +
  //       imagePlatforms.level2.pmd.width +
  //       300,
  //     y: 400,
  //     image: imagePlatforms.level2.sm,
  //   }),
  //   new Platform({
  //     x:
  //       imagePlatforms.level2.plg.width +
  //       imagePlatforms.level2.barwood.width +
  //       100 +
  //       imagePlatforms.level2.barwood.width +
  //       100 +
  //       imagePlatforms.level2.barwood.width +
  //       100 +
  //       imagePlatforms.level2.barwood.width +
  //       100 +
  //       imagePlatforms.level2.pmd.width +
  //       300 +
  //       imagePlatforms.level2.sm.width +
  //       300,
  //     y: 400,
  //     image: imagePlatforms.level2.sm,
  //   }),
  //   new Platform({
  //     x:
  //       imagePlatforms.level2.plg.width +
  //       imagePlatforms.level2.barwood.width +
  //       100 +
  //       imagePlatforms.level2.barwood.width +
  //       100 +
  //       imagePlatforms.level2.barwood.width +
  //       100 +
  //       imagePlatforms.level2.barwood.width +
  //       100 +
  //       imagePlatforms.level2.pmd.width +
  //       300 +
  //       imagePlatforms.level2.sm.width +
  //       300 +
  //       imagePlatforms.level2.sm.width +
  //       300,
  //     y: 600,
  //     image: imagePlatforms.level2.plg,
  //   }),
  //   new Platform({
  //     x:
  //       imagePlatforms.level2.plg.width +
  //       imagePlatforms.level2.barwood.width +
  //       100 +
  //       imagePlatforms.level2.barwood.width +
  //       100 +
  //       imagePlatforms.level2.barwood.width +
  //       100 +
  //       imagePlatforms.level2.barwood.width +
  //       100 +
  //       imagePlatforms.level2.pmd.width +
  //       300 +
  //       imagePlatforms.level2.sm.width +
  //       300 +
  //       imagePlatforms.level2.sm.width +
  //       300 +
  //       imagePlatforms.level2.plg.width,
  //     y: 600,
  //     image: imagePlatforms.level2.pmd,
  //   }),
  //   new Platform({
  //     x: 500,
  //     y: 300,
  //     image: imagePlatforms.level2.barbox,
  //     block: true,
  //   }),
  //   new Platform({
  //     x: 900,
  //     y: 300,
  //     image: imagePlatforms.level2.barboxlong,
  //     block: true,
  //   }),
  //   new Platform({
  //     x: 1500,
  //     y: 200,
  //     image: imagePlatforms.level2.barboxlong,
  //     block: true,
  //   }),
  //   new Platform({
  //     x: imagePlatforms.level2.plg.width + 400,
  //     y: 600,
  //     image: imagePlatforms.level2.sm,
  //   }),
  //   new Platform({
  //     x:
  //       imagePlatforms.level2.plg.width +
  //       300 +
  //       imagePlatforms.level2.sm.width +
  //       300,
  //     y: 600,
  //     image: imagePlatforms.level2.sm,
  //   }),
  //   new Platform({
  //     x:
  //       imagePlatforms.level2.plg.width +
  //       imagePlatforms.level2.barwood.width +
  //       100 +
  //       imagePlatforms.level2.barwood.width +
  //       100 +
  //       imagePlatforms.level2.barwood.width +
  //       100 +
  //       imagePlatforms.level2.barwood.width +
  //       100,
  //     y: 200,
  //     image: imagePlatforms.level2.barboxlong,
  //     block: true,
  //   }),
  //   new Platform({
  //     x:
  //       imagePlatforms.level2.plg.width +
  //       imagePlatforms.level2.barwood.width +
  //       100 +
  //       imagePlatforms.level2.barwood.width +
  //       100 +
  //       imagePlatforms.level2.barwood.width +
  //       100 +
  //       imagePlatforms.level2.barwood.width +
  //       100 +
  //       imagePlatforms.level2.barboxlong.width +
  //       200,
  //     y: 200,
  //     image: imagePlatforms.level2.barbox,
  //     block: true,
  //   }),
  //   new Platform({
  //     x:
  //       imagePlatforms.level2.plg.width +
  //       imagePlatforms.level2.barwood.width +
  //       100 +
  //       imagePlatforms.level2.barwood.width +
  //       100 +
  //       imagePlatforms.level2.barwood.width +
  //       100 +
  //       imagePlatforms.level2.barwood.width +
  //       100 +
  //       imagePlatforms.level2.barboxlong.width +
  //       200 +
  //       imagePlatforms.level2.barbox.width +
  //       200,
  //     y: 200,
  //     image: imagePlatforms.level2.barboxlong,
  //     block: true,
  //   }),
  //   new Platform({
  //     x:
  //       imagePlatforms.level2.plg.width +
  //       imagePlatforms.level2.barwood.width +
  //       100 +
  //       imagePlatforms.level2.barwood.width +
  //       100 +
  //       imagePlatforms.level2.barwood.width +
  //       100 +
  //       imagePlatforms.level2.barwood.width +
  //       100 +
  //       imagePlatforms.level2.pmd.width +
  //       200 +
  //       imagePlatforms.level2.sm.width +
  //       200 +
  //       imagePlatforms.level2.sm.width +
  //       200 +
  //       imagePlatforms.level2.barbox.width,
  //     y: 250,
  //     image: imagePlatforms.level2.barbox,
  //     block: true,
  //   }),
  //   new Platform({
  //     x:
  //       imagePlatforms.level2.plg.width +
  //       imagePlatforms.level2.barwood.width +
  //       100 +
  //       imagePlatforms.level2.barwood.width +
  //       100 +
  //       imagePlatforms.level2.barwood.width +
  //       100 +
  //       imagePlatforms.level2.barwood.width +
  //       100 +
  //       imagePlatforms.level2.pmd.width +
  //       200 +
  //       imagePlatforms.level2.sm.width +
  //       200 +
  //       imagePlatforms.level2.sm.width +
  //       200 +
  //       imagePlatforms.level2.barbox.width +
  //       200 +
  //       imagePlatforms.level2.barbox.width,
  //     y: 250,
  //     image: imagePlatforms.level2.barbox,
  //     block: true,
  //   }),
  // ];

  genericObjects = [
    new GenericObject({ x: 200, y: 470, image: objects.environments.cart }),
    new GenericObject({ x: 400, y: 430, image: objects.environments.house }),
    new GenericObject({ x: 1000, y: 450, image: objects.environments.furnace }),
    new GenericObject({ x: 1600, y: 360, image: objects.environments.lantern }),
    new GenericObject({
      x:
        imagePlatforms.level2.plg.width +
        imagePlatforms.level2.barwood.width +
        200 +
        imagePlatforms.level2.barwood.width +
        200,
      y: 360,
      image: objects.environments.well,
    }),
    new GenericObject({
      x:
        imagePlatforms.level2.plg.width +
        imagePlatforms.level2.barwood.width +
        200 +
        imagePlatforms.level2.barwood.width +
        200,
      y: 360,
      image: objects.environments.well,
    }),
    ,
    new GenericObject({
      x:
        imagePlatforms.level2.plg.width +
        imagePlatforms.level2.barwood.width +
        200 +
        imagePlatforms.level2.barwood.width +
        450,
      y: 440,
      image: objects.environments.merchant,
    }),
    new GenericObject({
      x:
        imagePlatforms.level2.plg.width +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.pmd.width +
        200 +
        imagePlatforms.level2.sm.width +
        200 +
        imagePlatforms.level2.sm.width +
        300,
      y: 430,
      image: objects.environments.house,
    }),
    new GenericObject({
      x:
        imagePlatforms.level2.plg.width +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.pmd.width +
        200 +
        imagePlatforms.level2.sm.width +
        400,
      y: 560,
      image: objects.environments.fences,
    }),
    new GenericObject({
      x:
        imagePlatforms.level2.plg.width +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.pmd.width +
        200 +
        imagePlatforms.level2.sm.width +
        200 +
        imagePlatforms.level2.sm.width +
        300,
      y: 430,
      image: objects.environments.house,
    }),
    new GenericObject({
      x:
        imagePlatforms.level2.plg.width +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.pmd.width +
        200 +
        imagePlatforms.level2.sm.width +
        200 +
        imagePlatforms.level2.sm.width +
        300 +
        imagePlatforms.level2.barwood.width +
        imagePlatforms.level2.barwood.width,
      y: 360,
      image: objects.environments.villa,
    }),
  ];

  collectibles = [
    new Collectible({
      position: { x: 300, y: 300 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.coins,
      value: 10,
      type: "coin",
    }),
    new Collectible({
      position: { x: 400, y: 300 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.coins,
      value: 10,
      type: "coin",
    }),
    new Collectible({
      position: { x: 700, y: 200 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.coins,
      value: 10,
      type: "coin",
    }),
    new Collectible({
      position: { x: 800, y: 200 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.coins,
      value: 10,
      type: "coin",
    }),
    new Collectible({
      position: { x: 900, y: 200 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.coins,
      value: 10,
      type: "coin",
    }),
    new Collectible({
      position: { x: 1200, y: 100 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.greenRunes,
      value: 10,
      type: "green",
    }),
    new Collectible({
      position: { x: 1300, y: 100 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.greenRunes,
      value: 10,
      type: "green",
    }),
    new Collectible({
      position: { x: 1400, y: 100 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.greenRunes,
      value: 10,
      type: "green",
    }),

    new Collectible({
      position: { x: 2600, y: 200 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.coins,
      value: 10,
      type: "coin",
    }),
    new Collectible({
      position: { x: 2650, y: 200 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.coins,
      value: 10,
      type: "coin",
    }),
    new Collectible({
      position: { x: 2700, y: 200 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.coins,
      value: 10,
      type: "coin",
    }),
    new Collectible({
      position: { x: 3400, y: 100 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.redRunes,
      value: 10,
      type: "red",
    }),
    new Collectible({
      position: { x: 3500, y: 100 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.redRunes,
      value: 10,
      type: "red",
    }),
    new Collectible({
      position: { x: 3600, y: 100 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.diamonds,
      value: 10,
      type: "diamond",
    }),
    new Collectible({
      position: { x: 4600, y: 400 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.diamonds,
      value: 10,
      type: "diamond",
    }),
    new Collectible({
      position: { x: 4700, y: 400 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.diamonds,
      value: 10,
      type: "diamond",
    }),
    new Collectible({
      position: { x: 4800, y: 400 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.diamonds,
      value: 10,
      type: "diamond",
    }),
    new Collectible({
      position: { x: 4300, y: 100 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.coins,
      value: 10,
      type: "coin",
    }),
    new Collectible({
      position: { x: 4400, y: 100 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.coins,
      value: 10,
      type: "coin",
    }),
    new Collectible({
      position: { x: 4500, y: 100 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.coins,
      value: 10,
      type: "coin",
    }),
    new Collectible({
      position: { x: 5300, y: 100 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.diamonds,
      value: 10,
      type: "diamond",
    }),
    new Collectible({
      position: { x: 5400, y: 100 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.greenRunes,
      value: 10,
      type: "green",
    }),
    new Collectible({
      position: { x: 5500, y: 100 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.redRunes,
      value: 10,
      type: "red",
    }),
    new Collectible({
      position: { x: 6400, y: 100 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.coins,
      value: 10,
      type: "coin",
    }),
    new Collectible({
      position: { x: 6500, y: 100 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.coins,
      value: 10,
      type: "coin",
    }),
    new Collectible({
      position: { x: 6600, y: 100 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.coins,
      value: 10,
      type: "coin",
    }),
    new Collectible({
      position: { x: 7300, y: 100 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.greenRunes,
      value: 10,
      type: "green",
    }),
    new Collectible({
      position: { x: 7400, y: 100 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.redRunes,
      value: 10,
      type: "red",
    }),
    new Collectible({
      position: { x: 7500, y: 100 },
      velocity: { x: 0, y: 0 },
      image: objects.collectibles.redRunes,
      value: 10,
      type: "red",
    }),
  ];
}

const animate = () => {
  requestAnimationFrame(animate);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  backgrounds.forEach((background) => {
    background.draw();
  });

  genericObjects.forEach((genericObject) => {
    genericObject.draw();
  });

  // render multiple platforms
  platforms.forEach((platform) => {
    platform.update();
    platform.velocity.x = 0;
  });

  player.update();

  enemies.forEach((enemy, index) => {
    enemy.update();

    // Enemy stomping
    if (collisionTop({ object1: player, object2: enemy })) {
      player.velocity.y -= 15;

      explosions.push(
        new Explosion({
          position: { x: enemy.position.x, y: enemy.position.y },
          velocity: { x: 0, y: 0 },
          image: sprites.werewolf.walk.explosion,
        })
      );
      // put out enemy from array
      setTimeout(() => {
        enemies.splice(index, 1);
      }, 0);

      setTimeout(() => {
        explosions.splice(0, 1);
      }, 500);
    } else if (
      player.position.x + 50 >= enemy.position.x &&
      player.position.x <= enemy.position.x + 50 &&
      player.position.y >= enemy.position.y &&
      player.position.y <= enemy.position.y
    ) {
      init();
    }
  });

  // put out explosion from array after last frame
  explosions.forEach((explosion) => {
    explosion.update();
    if (explosion.frames > explosion.image.width / explosion.height - 1) {
      setTimeout(() => {
        explosions.splice(0, 1);
      }, 500);
    }
  });

  // collectibles
  collectibles.forEach((collectible, index) => {
    collectible.update();

    if (
      player.position.x < collectible.position.x + collectible.width &&
      player.position.x + player.width > collectible.position.x &&
      player.position.y < collectible.position.y + collectible.height &&
      player.position.y + player.height > collectible.position.y
    ) {
      player.score += collectible.value;

      setTimeout(() => {
        collectibles.splice(index, 1);
      }, 0);
    }
  });

  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = player.speed;
  } else if (
    (keys.left.pressed && player.position.x > 100) ||
    (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)
  ) {
    player.velocity.x = -player.speed;
  } else {
    player.velocity.x = 0;

    // platform scrolling
    if (keys.right.pressed) {
      scrollOffset += player.speed;

      platforms.forEach((platform) => {
        platform.position.x -= player.speed;
      });

      genericObjects.forEach((genericObject) => {
        genericObject.position.x -= player.speed * 0.8;
      });

      backgrounds.forEach((background) => {
        background.position.x -= player.speed * 0.7;
      });

      enemies.forEach((enemy) => (enemy.position.x -= player.speed));

      explosions.forEach((explosion) => (explosion.position.x -= player.speed));

      collectibles.forEach(
        (collectible) => (collectible.position.x -= player.speed)
      );
    } else if (keys.left.pressed && scrollOffset > 0) {
      scrollOffset -= player.speed;

      platforms.forEach((platform) => {
        platform.position.x += player.speed;
      });

      genericObjects.forEach((genericObject) => {
        genericObject.position.x += player.speed * 0.8;
      });

      backgrounds.forEach((background) => {
        background.position.x += player.speed * 0.7;
      });

      enemies.forEach((enemy) => (enemy.position.x += player.speed));

      explosions.forEach((explosion) => (explosion.position.x += player.speed));

      collectibles.forEach(
        (collectible) => (collectible.position.x += player.speed)
      );
    }
  }

  // Platform collision detection
  platforms.forEach((platform) => {
    if (isOnTop({ object: player, platform })) {
      player.velocity.y = 0;
      player.jumpCount = 0;
    }

    if (
      platform.block &&
      createBlock({
        object: player,
        platform,
      })
    ) {
      player.velocity.y = -player.velocity.y;
    }

    enemies.forEach((enemy) => {
      if (
        isOnTop({
          object: enemy,
          platform,
        })
      )
        enemy.velocity.y = 0;
    });

    // growthBites.forEach((growthBite) => {
    //   if (
    //     isOnTop({
    //       object: growthBite,
    //       platform,
    //     })
    //   )
    //     growthBite.velocity.y = 0;
    // });
  });

  if (player.velocity.y === 0) {
    if (
      keys.right.pressed &&
      lastKey === "right" &&
      player.currentSprite !== player.sprites.swordsman.run.right
    ) {
      player.frames = 1;
      player.currentSprite = player.sprites.swordsman.run.right;
    } else if (
      keys.left.pressed &&
      lastKey === "left" &&
      player.currentSprite !== player.sprites.swordsman.run.left
    ) {
      player.currentSprite = player.sprites.swordsman.run.left;
    } else if (
      !keys.left.pressed &&
      lastKey === "left" &&
      player.currentSprite !== player.sprites.swordsman.idle.left
    ) {
      player.currentSprite = player.sprites.swordsman.idle.left;
    } else if (
      !keys.right.pressed &&
      lastKey === "right" &&
      player.currentSprite !== player.sprites.swordsman.idle.right
    ) {
      player.currentSprite = player.sprites.swordsman.idle.right;
    }
  }

  // WIN condition
  // if (scrollOffset > 9000) {
  //   initLevel2();
  // }

  // LOSE condition: death pits
  if (player.position.y > canvas.width) {
    init();
  }
  console.log("scrollOffset", scrollOffset);
};

init();
animate();

addEventListener("keydown", (event) => {
  switch (event.code) {
    case "KeyW":
      if (player.jumpCount < 2) {
        player.velocity.y = -15; // Perform jump
        player.jumpCount++;
      }

      if (lastKey === "right")
        player.currentSprite = player.sprites.swordsman.jump.right;
      else player.currentSprite = player.sprites.swordsman.jump.left;
      break;
    case "KeyA":
      keys.left.pressed = true;
      lastKey = "left";
      break;
    case "KeyD":
      keys.right.pressed = true;
      lastKey = "right";
      break;
  }
});

addEventListener("keyup", (event) => {
  switch (event.code) {
    case "KeyW":
      player.velocity.y = 0;
      break;
    case "KeyA":
      keys.left.pressed = false;
      break;
    case "KeyD":
      keys.right.pressed = false;
      break;
  }
});
