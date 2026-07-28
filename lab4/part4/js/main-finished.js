    /*
    Name: Megan McMullin
    File: main-finished.js
    Date: July 28, 2026
    INFT 1206: Lab 4 Part 4: Adding features to our bouncing balls demo
    */
// setup canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// reference to the paragraph
const ballCountPara = document.querySelector("p");
let count = 0; 

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// Create a Shape class
class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

// Modeling a ball in our program

class Ball extends Shape {
  constructor(x, y, velX, velY, color, size) {
    super(x, y, velX, velY);
    this.color = color;
    this.size = size;
    this.exists = true; 
  }

  // drawing the ball
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }
  
  // updating the ball's data
  update() {
    if (this.x + this.size >= width) {
      this.velX = -this.velX;
    }

    if (this.x - this.size <= 0) {
      this.velX = -this.velX;
    }

    if (this.y + this.size >= height) {
      this.velY = -this.velY;
    }

    if (this.y - this.size <= 0) {
      this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  // adding collision detecting 
  collisionDetect() {
    for (const ball of balls) {
      if (!(this !== ball) && ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

// Defining EvilCircle
class EvilCircle extends Shape {
  constructor(x, y) {
    super(x, y, 20, 20); // passes x, y up, hardcodes velX/velY
    this.color = "white";
    this.size = 10;

    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "a":
          this.x -= this.velX;
          break;
        case "d":
          this.x += this.velX;
          break;
        case "w":
          this.y -= this.velY;
          break;
        case "s":
          this.y += this.velY;
          break;
      }
    });
  }
  // drawing the ball
  draw() {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }
  // updating the ball's data
  checkBounds() {
    if (this.x + this.size >= width) {
      this.velX -= this.velX; // bounce back from right edge
    }

    if (this.x - this.size <= 0) {
      this.velX += this.velX; // bounce back from left edge
    }

    if (this.y + this.size >= height) {
      this.velY -= this.velY; // bounce back from bottom edge
    }

    if (this.y - this.size <= 0) {
      this.velY += this.velY; // bounce back from top edge
    }
  }
  // adding collision detecting 
  collisionDetect() {
    for (const ball of balls) {
      if (ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.exists = false;
          
          // decrement when the evil circle eats a ball
          count--;
          ballCountPara.textContent = `Ball count: ${count}`;
        }
      }
    }
  }
}

// Animating the ball
const balls = [];

while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size,
  );

  balls.push(ball);
  // increment when a ball is added
  count++;
  ballCountPara.textContent = `Ball count: ${count}`;
}

// Create the evil circle once, outside the loop
const evilCircle = new EvilCircle(random(0, width), random(0, height));

function loop() {
  ctx.fillStyle = "rgb(0 0 0 / 25%)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    if (ball.exists) {
      ball.draw();
      ball.update();
      ball.collisionDetect();
    }
  }
  
  evilCircle.draw();
  evilCircle.checkBounds();
  evilCircle.collisionDetect();

  requestAnimationFrame(loop);
}

loop();

