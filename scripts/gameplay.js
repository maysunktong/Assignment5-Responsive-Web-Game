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

class Enemy {
  constructor({
    position,
    velocity,
    image,
    distance = {
      limit: 200,
      traveled: 0,
    },
  }) {
    this.position = {
      x: position.x,
      y: position.y,
    };

    this.velocity = {
      x: velocity.x,
      y: velocity.y,
    };

    this.width = 128;
    this.height = 128;

    this.image = image;

    this.frames = 0;
    this.frameInterval = 10;
    this.frameTimer = 0;

    this.distance = distance;

    this.sprites = 0;
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
  }
}

class Platform {
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
let enemies = [];

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

// initializing Level 1
async function initLevel1() {
  player = new Player();

  for (let i = 0; i < 10; i++) {
    backgrounds.push(
      new Background({
        x: i * objects.backgrounds.forest.width,
        y: 0,
        image: objects.backgrounds.forest,
      })
    );
  }

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

  // how far have platform scrolled
  scrollOffset = 0;
}

// initializing Level 2
async function initLevel2() {
  player = new Player();

  for (let i = 0; i < 10; i++) {
    backgrounds.push(
      new Background({
        x: i * objects.backgrounds.desert.width,
        y: 0,
        image: objects.backgrounds.desert,
      })
    );
  }

  platforms = [
    new Platform({
      x: 0,
      y: 600,
      image: imagePlatforms.level2.plg,
    }),
    new Platform({
      x: imagePlatforms.level2.plg.width,
      y: 400,
      image: imagePlatforms.level2.barwood,
    }),
    new Platform({
      x:
        imagePlatforms.level2.plg.width +
        imagePlatforms.level2.barwood.width +
        100,
      y: 300,
      image: imagePlatforms.level2.barwood,
    }),
    new Platform({
      x:
        imagePlatforms.level2.plg.width +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100,
      y: 200,
      image: imagePlatforms.level2.barwood,
    }),
    new Platform({
      x:
        imagePlatforms.level2.plg.width +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100 +
        imagePlatforms.level2.barwood.width +
        100,
      y: 350,
      image: imagePlatforms.level2.barwood,
    }),
    new Platform({
      x:
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
      x: 500,
      y: 300,
      image: imagePlatforms.level2.barbox,
    }),
    new Platform({
      x: 900,
      y: 300,
      image: imagePlatforms.level2.barboxlong,
    }),
    new Platform({
      x: 1500,
      y: 200,
      image: imagePlatforms.level2.barboxlong,
    }),
    new Platform({
      x: imagePlatforms.level2.plg.width + 400,
      y: 600,
      image: imagePlatforms.level2.sm,
    }),
    new Platform({
      x:
        imagePlatforms.level2.plg.width +
        300 +
        imagePlatforms.level2.sm.width +
        300,
      y: 600,
      image: imagePlatforms.level2.sm,
    }),
    new Platform({
      x:
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
    }),
    new Platform({
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
        imagePlatforms.level2.barboxlong.width +
        200,
      y: 200,
      image: imagePlatforms.level2.barbox,
    }),
    new Platform({
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
        imagePlatforms.level2.barboxlong.width +
        200 +
        imagePlatforms.level2.barbox.width +
        200,
      y: 200,
      image: imagePlatforms.level2.barboxlong,
    }),
    new Platform({
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
        200 +
        imagePlatforms.level2.barbox.width,
      y: 250,
      image: imagePlatforms.level2.barbox,
    }),
    new Platform({
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
        200 +
        imagePlatforms.level2.barbox.width +
        200 +
        imagePlatforms.level2.barbox.width,
      y: 250,
      image: imagePlatforms.level2.barbox,
    }),
  ];

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
        genericObject.position.x -= player.speed * 0.8;
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
        genericObject.position.x += player.speed * 0.8;
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

  if (player.velocity.y === 0) {
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
    }
  }

  // WIN condition
  // if (scrollOffset > 3000) {
  //   console.log("You win");
  // }

  // LOSE condition: death pits
  if (player.position.y > canvas.width) {
    // initLevel1();
    initLevel1();
    // initLevel3();
  }
};

// initLevel1();
initLevel2();
// initLevel3();
animate();

addEventListener("keydown", (event) => {
  switch (event.code) {
    case "KeyW":
      player.velocity.y = -15; // Perform jump
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
