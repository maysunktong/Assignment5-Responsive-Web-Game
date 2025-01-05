const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };
    this.width = 50;
    this.height = 50;
  }

  draw() {
    ctx.fillStyle = "green";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    
  }
}

let player = new Player();
player.draw();
