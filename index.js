// board
const blockSize = 25;
const rows = 20;
const cols = 20;
const canvas = document.querySelector("canvas");
canvas.width = rows * blockSize;
canvas.height = cols * blockSize;
const c = canvas.getContext("2d");

// snake
let snakeX = Math.floor(Math.random() * rows) * blockSize;
let snakeY = Math.floor(Math.random() * cols) * blockSize;

let velocityX = 0;
let velocityY = 0;

let snakeBody = [];

const SNAKE_SPEED = 3;

// food
let foodX = Math.floor(Math.random() * rows) * blockSize;
let foodY = Math.floor(Math.random() * cols) * blockSize;

let gameOver = false;

document.addEventListener("keyup", (e) => {
  if (
    (e.key === "w" || e.key === "ArrowUp" || e.key === "W") &&
    velocityY == 0
  ) {
    velocityX = 0;
    velocityY = -1;
  } else if (
    (e.key === "a" || e.key === "ArrowLeft" || e.key === "A") &&
    velocityX == 0
  ) {
    velocityX = -1;
    velocityY = 0;
  } else if (
    (e.key === "s" || e.key === "ArrowDown" || e.key === "S") &&
    velocityY == 0
  ) {
    velocityX = 0;
    velocityY = 1;
  } else if (
    (e.key === "d" || e.key === "ArrowRight" || e.key === "D") &&
    velocityX == 0
  ) {
    velocityX = 1;
    velocityY = 0;
  }
});

let lastRenderTime = 0;
function update(currentTime) {
  if (gameOver) {
    window.location.reload();
    return;
  }
  window.requestAnimationFrame(update);
  let secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentTime;
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);

  // food
  c.fillStyle = "red";
  c.fillRect(foodX, foodY, blockSize, blockSize);

  // collision
  if (snakeX === foodX && snakeY === foodY) {
    snakeBody.push([foodX, foodY]);
    foodX = Math.floor(Math.random() * rows) * blockSize;
    foodY = Math.floor(Math.random() * cols) * blockSize;
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    // to move the incresed section along
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) snakeBody[0] = [snakeX, snakeY];

  // snake
  c.fillStyle = "lime";
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  c.fillRect(snakeX, snakeY, blockSize, blockSize);

  for (let i = 0; i < snakeBody.length; i++) {
    // to add on the food
    c.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  if (
    snakeX < 0 ||
    snakeX + blockSize >= canvas.width ||
    snakeY < 0 ||
    snakeY + blockSize > canvas.height
  ) {
    gameOver = true;
    alert("Game Over");
  }

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
      gameOver = true;
      alert("Game Over");
    }
  }
}

update();
