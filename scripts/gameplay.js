import { imagePlatforms } from "./imagePlatforms.js";
import { objects } from "./objects.js";
import { sprites } from "./sprites.js";

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

    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity;
    else {
      this.jumpCount = 0;
    }
  }
}

export class Platform {
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

/* declare variables for init() */
let player = new Player();
let platforms = [];
let genericObjects = [];
let backgrounds = [];
let lastKey;
let keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};
let scrollOffset = 0;

// initializing the game: restart
async function init() {
  player = new Player();
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
  ];

  for (let i = 0; i < 10; i++) {
    backgrounds.push(
      new Background({
        x: i * objects.backgrounds.forest.width,
        y: 0,
        image: objects.backgrounds.forest,
      })
    );
  }

  genericObjects = [
    new GenericObject({ x: 0, y: 100, image: objects.trees.green1 }),
    new GenericObject({
      x: objects.trees.green1.width + 300,
      y: 150,
      image: objects.trees.green3,
    }),
    new GenericObject({
      x: objects.trees.green1.width + 300 + objects.trees.green3.width + 200,
      y: 150,
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
        300,
      y: 150,
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

  // how far have platform scrolled
  scrollOffset = 0;
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
    platform.draw();
  });
  // player has to be generated after platforms
  player.update();

  // key bindings management, limit player's distance
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
        genericObject.position.x -= player.speed * 0.7;
      });
      backgrounds.forEach((background) => {
        background.position.x -= player.speed * 0.7;
      });
    } else if (keys.left.pressed && scrollOffset > 0) {
      scrollOffset -= player.speed;
      platforms.forEach((platform) => {
        platform.position.x += player.speed;
      });
      genericObjects.forEach((genericObject) => {
        genericObject.position.x += player.speed * 0.7;
      });
      backgrounds.forEach((background) => {
        background.position.x += player.speed * 0.7;
      });
    }
  }

  // platform collision detection
  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });

  // Sprite switching logic
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
    d;
  }

  // WIN condition
  // if (scrollOffset > 3000) {
  //   console.log("You win");
  // }

  // LOSE condition: death pits
  if (player.position.y > canvas.width) {
    init();
  }
};

init();
animate();

addEventListener("keydown", (event) => {
  switch (event.code) {
    case "KeyW":
      player.velocity.y = -15; // Perform jump
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
