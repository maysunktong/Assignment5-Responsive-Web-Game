const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const gravity = 1;
class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };
    this.width = 50;
    this.height = 50;

    this.velocity = {
      x: 0,
      y: 0,
    };
  }

  draw() {
    ctx.fillStyle = "green";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity;
    else this.velocity.y = 0;
  }
}

class Platform {
  constructor() {
    this.position = {
      x: 500,
      y: 100,
    };
    this.width = 200;
    this.height = 10;
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

let player = new Player();
let platform = new Platform();

let keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.update();
  platform.draw();

  // player movement
  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = 5;
  } else if (keys.left.pressed && player.position.x > 100) {
    player.velocity.x = -5;
  } else {
    player.velocity.x = 0;
    
    // when players hit edge, platform moves
    if (keys.right.pressed) {
      platform.position.x-= 5
    } else if (keys.left.pressed){
      platform.position.x += 5
    }
  }

  // collision detection
  if (
    player.position.y + player.height <= platform.position.y &&
    player.position.y + player.height + player.velocity.y >=
      platform.position.y &&
    player.position.x + player.width >= platform.position.x &&
    player.position.x <= platform.position.x + platform.width
  )
    player.velocity.y = 0;
}

animate();

addEventListener("keydown", (event) => {
  switch (event.code) {
    case "KeyW": // jump
      player.velocity.y = -20;
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
      break;
    case "KeyA":
      keys.left.pressed = false;
      break;
    case "KeyD":
      keys.right.pressed = false;
      break;
  }
});
