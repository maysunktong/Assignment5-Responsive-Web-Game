import { imagePlatforms } from "./imagePlatforms.js";
import { objects } from "./objects.js";

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
    this.width = 30;
    this.height = 30;
    this.velocity = {
      // player will draw downward only, y-axis
      x: 0,
      y: 0,
    };
    this.speed = 10;
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity;
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
const init = () => {
  player = new Player();
  platforms = [
    new Platform({
      x: 0,
      y: 600,
      image: imagePlatforms.pmd,
    }),
    new Platform({
      x: imagePlatforms.pmd.width + 200,
      y: 600,
      image: imagePlatforms.tpmd,
    }),
    new Platform({
      x: imagePlatforms.pmd.width + 200 + imagePlatforms.tpmd.width + 200,
      y: 500,
      image: imagePlatforms.bsm,
    }),
    new Platform({
      x:
        imagePlatforms.pmd.width +
        200 +
        imagePlatforms.tpmd.width +
        200 +
        imagePlatforms.bsm.width +
        200,
      y: 400,
      image: imagePlatforms.bmd,
    }),
    new Platform({
      x:
        imagePlatforms.pmd.width +
        200 +
        imagePlatforms.tpmd.width +
        200 +
        imagePlatforms.bsm.width +
        200 +
        imagePlatforms.bmd.width +
        200,
      y: 500,
      image: imagePlatforms.bsm,
    }),
    new Platform({
      x:
        imagePlatforms.pmd.width +
        200 +
        imagePlatforms.tpmd.width +
        200 +
        imagePlatforms.bsm.width +
        200 +
        imagePlatforms.bmd.width +
        200 +
        imagePlatforms.bsm.width +
        200,
      y: 500,
      image: imagePlatforms.tpplg,
    }),
    new Platform({
      x:
        imagePlatforms.pmd.width +
        200 +
        imagePlatforms.tpmd.width +
        200 +
        imagePlatforms.bsm.width +
        200 +
        imagePlatforms.bmd.width +
        200 +
        imagePlatforms.bsm.width +
        200 +
        imagePlatforms.tpplg.width +
        200,
      y: 600,
      image: imagePlatforms.tpmd,
    }),
    new Platform({
      x:
        imagePlatforms.pmd.width +
        200 +
        imagePlatforms.tpmd.width +
        200 +
        imagePlatforms.bsm.width +
        200 +
        imagePlatforms.bmd.width +
        200 +
        imagePlatforms.bsm.width +
        200 +
        imagePlatforms.tpplg.width +
        200 +
        imagePlatforms.tpmd.width +
        200,
      y: 600,
      image: imagePlatforms.plg,
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
};

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
      player.velocity.y -= 15;
      break;
    case "KeyA":
      keys.left.pressed = true;
      break;
    case "KeyD":
      keys.right.pressed = true;
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
