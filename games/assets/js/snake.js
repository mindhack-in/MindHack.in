 const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const scoreEl = document.getElementById("score");
    const bestScoreEl = document.getElementById("bestScore");

    let box = 20; // Snake block size
    let snake = [];
    let direction;
    let food;
    let score;
    let bestScore = localStorage.getItem("snakeBest") || 0;
    bestScoreEl.textContent = bestScore;

    function initGame() {
      snake = [{ x: 9 * box, y: 9 * box }];
      direction = null;
      score = 0;
      scoreEl.textContent = score;
      placeFood();
    }

    function placeFood() {
      food = {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box
      };
    }

    document.addEventListener("keydown", e => {
      if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
      else if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
      else if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
      else if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    });

    function draw() {
      ctx.fillStyle = "#333";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "#4CAF50" : "#8BC34A";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
      }

      ctx.fillStyle = "red";
      ctx.fillRect(food.x, food.y, box, box);

      let snakeX = snake[0].x;
      let snakeY = snake[0].y;

      if (direction === "LEFT") snakeX -= box;
      if (direction === "UP") snakeY -= box;
      if (direction === "RIGHT") snakeX += box;
      if (direction === "DOWN") snakeY += box;

      if (snakeX === food.x && snakeY === food.y) {
        score++;
        scoreEl.textContent = score;
        if (score > bestScore) {
          bestScore = score;
          localStorage.setItem("snakeBest", bestScore);
          bestScoreEl.textContent = bestScore;
        }
        placeFood();
      } else {
        snake.pop();
      }

      let newHead = { x: snakeX, y: snakeY };

      if (
        snakeX < 0 ||
        snakeY < 0 ||
        snakeX >= canvas.width ||
        snakeY >= canvas.height ||
        collision(newHead, snake)
      ) {
        clearInterval(game);
        return;
      }

      snake.unshift(newHead);
    }

    function collision(head, array) {
      for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
          return true;
        }
      }
      return false;
    }

    let game;
    function startGame() {
      clearInterval(game);
      initGame();
      game = setInterval(draw, 100);
    }

    startGame();