import { Background } from "./background.js";
import { Pipes } from "./pipes.js";
import { Player } from "./player.js"


window.addEventListener("load", function () {
  const canvas = this.document.getElementById("canvas");
  const ratio = window.devicePixelRatio || 1;

  const ctx = canvas.getContext("2d");
          

  if (this.window.innerWidth < 490) canvas.width = this.window.innerWidth * 2;
  else canvas.width = this.window.innerWidth;
  canvas.height = 500;
  ctx.drawImage(this.document.getElementById("gameLogo"),0,0,canvas.width,canvas.height);
  
  class Game {
    constructor(gameWidth, gameHeight, ctx) {
      console.log("klsdjflksf")
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.speed = 1;
      this.background = new Background(this);
      this.pipes = []
      this.interval = 249;
      this.flipped = 0;
      this.lastParam2 = [];
      this.lastParam3 = null;
      this.player = new Player(this);
      this.gameOver = false;
      this.score = 0;
      this.fontSize = 30;
      this.fontFamily = "Helvetica";
      this.fontColor = "black";
      if (this.gameWidth > 500) {
        this.pipes.push(new Pipes(this, 0, this.getRandomParam3(), this.gameWidth / 2));
      }
      console.log(this.pipes.length)
    }
    getRandomParam2() {
      let num;
      do {
        num = Math.floor(Math.random() * 2);
      } while (this.lastParam2[0] === num && this.lastParam2[1] === num);
      this.lastParam2.push(num);
      if (this.lastParam2.length > 2) this.lastParam2.shift();
      return num;
    }
    getRandomParam3() {
      let num;
      do {
        num = Math.floor(Math.random() * 3);
      } while (num === this.lastParam3);
      this.lastParam3 = num;
      return num;
    }
    update() {
      if (this.gameOver === true) {
        this.player.moveCrash();
        return;
      }
      this.background.update();
      this.pipes.forEach((pipe) => {
        pipe.update();
      });
      this.interval++;
      if (this.interval === 250) {
        this.pipes.push(new Pipes(this, this.getRandomParam2(), this.getRandomParam3(), this.gameWidth));
        this.interval = 0;
      }
      this.player.update();
    }
    draw(ctx) {
      this.background.draw(ctx);
      this.pipes.forEach((pipe) => {
        pipe.draw(ctx);
      });
      this.player.draw(ctx);
      ctx.font = this.fontSize * 1 + "px " + this.fontFamily;
      ctx.fillText("Score : " + this.score, 50, 50);
      if (this.gameOver === true) {
        ctx.font = this.fontSize + "px " + this.fontFamily;
        ctx.fillText("Game Over! Score : " + this.score, this.gameWidth / 3, this.gameHeight / 3);
      }
    }
  }

  let game = new Game(canvas.width, canvas.height, ctx);

  document.getElementById("startButton").addEventListener("click", () => {
    animate(0);
    document.getElementById("startButton").style.display = "none"; // Hide the button after start
    document.body.style.overflow = "hidden";

  });




  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
      game.draw(ctx);
      game.update();
      checkCollision()
      requestAnimationFrame(animate);
    // }
  }
  function checkCollision() {
    game.pipes.forEach(pipe => {
      if (pipe.markForDeletion) { game.score++; game.pipes.splice(game.pipes.indexOf(pipe), 1); }
      if (pipe.x < game.player.x + game.player.checkWidth &&
        pipe.x + pipe.width > game.player.x &&
        pipe.y < game.player.y + game.player.checkHeight &&
        pipe.y + pipe.height > game.player.y) {
        game.gameOver = true;
        document.getElementById("startButton").innerHTML = "Restart Game";
        document.getElementById("startButton").style.display = 'block'
document.body.style.overflow = "";

        document.getElementById("startButton").addEventListener("click", () => {
          document.getElementById("startButton").style.display = "none";
document.body.style.overflow = "hidden";

          game = new Game(canvas.width, canvas.height, ctx);
          game.gameOver = false;
         
        });
      }
    });
    return game;

  }

});


