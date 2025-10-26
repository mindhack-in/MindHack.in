import { Player } from "./js/player.js";
import { Enemy } from "./js/enemy.js";

window.addEventListener("load", function () {
  document.addEventListener(
    "touchmove",
    function (e) {
      e.preventDefault();
    },
    { passive: false }
  );

  const canvas = this.document.getElementById("canvas");

  canvas.addEventListener(
    "touchmove",
    (e) => {
      e.preventDefault(); // prevent pull-to-refresh
    },
    { passive: false }
  );

  const ctx = canvas.getContext("2d");
  const height = 100;
  const width = 250;
  console.log(this.window.innerWidth )
  if(this.window.innerWidth <500)
    canvas.width = this.window.innerWidth * 3;
  else
        canvas.width = this.window.innerWidth ;
  canvas.height = 500;
  let fps = 1;
  let frameInterval = 10000 / fps;
  let frameTimer = 0;
  let frameX = 0;
  let maxFrame = 2;

  let backgroundX = 0;

  let background = this.document.getElementById("background");
  class Main {
    constructor(ctx) {
      this.context = ctx;
      this.gameWidth = canvas.width;
      this.gameHight = canvas.height;
      this.player = new Player(
        ctx,
        width,
        height,
        this.gameWidth,
        this.gameHight
      );
      this.enemies = [];
      this.enemyTimer = 0;
      this.enemyInterval = 25;
    }
  }

  let main = new Main(ctx);
  function animate(deltaTime) {
    backgroundX--;

    if (backgroundX < -main.gameWidth) {
      backgroundX = 0;
    }

    main.enemies.forEach((enemy) => {
      enemy.update(deltaTime);
      if (enemy.markForDeletion)
        main.enemies.splice(main.enemies.indexOf(enemy), 1);
    });

    if (frameTimer > frameInterval) {
      frameTimer = 0;
      if (frameX < maxFrame) frameX++;
      else frameX = 0;

      if (main.enemyTimer > main.enemyInterval) {
        main.enemyTimer = 0;
        main.enemies.push(
          new Enemy(main.gameWidth, Math.random() * main.gameHight * 0.7)
        );
      } else {
        main.enemyTimer += 1;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for(let i=0;i<5;i++)
        ctx.drawImage(background, backgroundX+i*1460, 0, 1460, 1095);
      
      main.player.draw(frameX, main.enemies);
      main.enemies.forEach((en) => {
        en.update(deltaTime);
        en.draw(ctx);
        main.player.checkCollision(en);
      });
    } else frameTimer += deltaTime;

    if (!main.player.gameOver) requestAnimationFrame(animate);
  }

  animate(0);

  ctx.drawImage;
});
