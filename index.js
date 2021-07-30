/*
 * Name: Arjun Ajay Jagnani
 * Date: July 15, 2021
 *
 * This is the index.js file linked to the index.html file. This manages the complete snake game
 * being cinducted on the website, and displays the appropriate figures, and listens for
 * appropriate events.
 */

"use strict";
(function() {
  window.addEventListener("load", init);
  window.addEventListener("keydown", keys);

  let canvas;
  let ctx;
  let height;
  let width;
  const SIZE = 10;
  let score = 0;
  let dx = 0;
  let dy = SIZE;
  const TIME = 75;
  let timer = setInterval(create, TIME);
  let food = {
    x: 0,
    y: 0
  };
  let snake = [];

  /** The initialize function, that sets all the initial value, and initializes all variables */
  function init() {
    document.getElementById("start").addEventListener("click", createCanvas);
  }

  /** Creates a fresh canvas everytime and starts the game for the user */
  function createCanvas() {
    let canv = document.createElement('canvas');
    canv.id = "myCanvas";
    document.getElementById("add-canvas").appendChild(canv);
    canvas = document.querySelectorAll("canvas")[0];
    ctx = canvas.getContext("2d");
    height = canvas.height;
    width = canvas.width;
    addFood();
    addSnake(0, 0);
    addSnake(SIZE, 0);
    addSnake(SIZE * 2, 0);
    create();

  }

  /**
   * Fills a rectangle at the given coordinates, of the size SIZE
   * @param {number} x - The x coordinate of the rectangle
   * @param {number} y  - The y coordinate of the rectangle
   */
  function drawRect(x, y) {
    ctx.fillRect(x, y, SIZE, SIZE);
  }

  /** Adds blocks to be captured by the snake in random locations inside the canvas */
  function addFood() {
    let xVal = Math.floor(Math.random() * width / SIZE) * SIZE;
    let yVal = Math.floor(Math.random() * height / SIZE) * SIZE;
    food = {
      x: xVal,
      y: yVal
    };
  }

  /**
   * Increases the size of the snake in the specified coordinate directions
   * @param {number} xVal - The x coordinate for the snake to increase on the x-axis
   * @param {number} yVal - The y coordinate for the snake to increase on the y-axis
   */
  function addSnake(xVal, yVal) {
    snake.push({
      x: xVal,
      y: yVal
    });
  }

  /** Creates a snake on the canvas of the required length */
  function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
      drawRect(snake[i].x, snake[i].y);
    }
  }

  /**
   * Handles collision of the snake with food or with itself, and carries the control
   * condition forward as it should be, in accordance with the element collided with
   */
  function create() {
    ctx.clearRect(0, 0, width, height);
    snake.shift();
    if (foodCollide()) {
      addHead();
      addFood();
      const INCREASE = 10;
      score += INCREASE;
      let points = document.getElementsByTagName("span")[0];
      points.innerHTML = score;
    }
    if (dumbSelfCollide()) {
      stopGame();
      score = 0;
      clearInterval(timer);
    }
    addHead();
    drawSnake();
    drawRect(food.x, food.y);
  }

  /**
   * Ends the game for the player, and displays an appropriate message.
   */
  function stopGame() {
    let para = document.createElement('p');
    para.id = "ending";
    const NODE = document.createTextNode("You lost, final score: " + score);
    para.appendChild(NODE);
    document.getElementById("end-game").appendChild(para);
  }

  /** Adds to the size of the snake-head */
  function addHead() {
    let x = snake[snake.length - 1].x + dx;
    let y = snake[snake.length - 1].y + dy;
    if (x > width) {
      x = 0;
    } else if (y > height) {
      y = 0;
    } else if (x < 0) {
      x = width;
    } else if (y < 0) {
      y = height;
    }
    addSnake(x, y);
  }

  /**
   * Handles the directional control for the snake, as the user uses arrow keys to play
   * the game
   * @param {Event} check - The key pressed by the user
   */
  function keys(check) {
    const COND1 = 38;
    const COND2 = 39;
    const COND3 = 40;
    const COND4 = 37;
    if (check.keyCode === COND1) {
      dy = -SIZE;
      dx = 0;
    } else if (check.keyCode === COND2) {
      dy = 0;
      dx = SIZE;
    } else if (check.keyCode === COND3) {
      dy = SIZE;
      dx = 0;
    } else if (check.keyCode === COND4) {
      dx = -SIZE;
      dy = 0;
    }
  }

  /**
   * Checks if snake has collided with food or not.
   * @returns {boolean} - whether the snake has actually collided with a food particle or not
   */
  function foodCollide() {
    let head = snake[snake.length - 1];
    return (head.x === food.x && head.y === food.y);
  }

  /**
   * Checks if the snake has collided with itself or not.
   * @returns {boolean} whether the snake has collided with itself or not
   */
  function dumbSelfCollide() {
    let head = snake[snake.length - 1];
    for (let i = 0; i < snake.length - 1; i++) {
      if (snake[i].x === head.x && snake[i].y === head.y) {
        return true;
      }
    }
    return false;
  }
})();