export class Player {
    constructor(game) {
        this.game = game;
        this.x = 40;
        this.y = 0;
        this.image = document.getElementById("player")
        this.width = 100;
        this.height = 50;

        this.frameHeight = this.image.height / 4;
        this.frameWidth = this.image.width / 3;
        window.addEventListener("keydown", (e) => {

            if (this.game.gameOver === false) {
                if (e.key === "ArrowUp") {
                    this.y -= 30;
                }
                else if (e.key === "ArrowRight") {
                    this.x += 10;
                } else if (e.key === "ArrowLeft") {
                    this.x -= 10;
                }
            }
        });

        window.addEventListener("touchstart", (e) => {
                        if (this.game.gameOver === false) {

            this.touchY = e.changedTouches[0].pageY;
            this.touchX = e.changedTouches[0].pageX;
                        }
        });
        this.touchThreshold = 10;

        window.addEventListener("touchmove", (e) => {
                        if (this.game.gameOver === false) {

            const currentY = e.changedTouches[0].pageY;
            const currentX = e.changedTouches[0].pageX;
            const swipeY = currentY - this.touchY;
            const swipeX = currentX - this.touchX;
            if (swipeY < -this.touchThreshold) {
                this.y -= 30;
                this.touchY = currentY;
            } else if (swipeY > this.touchThreshold) {
                this.y += 10;
                this.touchY = currentY;
            }
            if (swipeX < -this.touchThreshold) {
                this.x -= 10;
                this.touchX = currentX;
            } else if (swipeX > this.touchThreshold) {
                this.x += 10;
                this.touchX = currentX;
            }
        }
        });

        this.frameRow = 0;
        this.frameColumn = 0;
        this.frameColumnUpdateInterval = 100;
        this.frameColumnUpdateTimer = 0;

        this.checkHeight = this.height * 0.75
        this.checkWidth = this.width * 0.75

    }

    validateCordinates() {
        if (this.y < 0) this.y = 0;
        if (this.y > this.game.gameHeight - this.checkHeight) {
            this.y = this.game.gameHeight - this.checkHeight;
            this.game.gameOver = true;
        }

        if (this.x < 0) this.x = 0;
        if (this.x > this.game.checkWidth - this.width) this.x = this.game.checkWidth - this.width;

    }
    update() {

        this.y += 0.5;

        this.validateCordinates();
        this.frameColumnUpdateTimer++;

        if (this.frameColumnUpdateTimer === this.frameColumnUpdateInterval) {
            this.frameColumn += 1;
            this.frameColumnUpdateTimer = 0;
            if (this.frameColumn === 3) this.frameColumn = 0;
        }
    }


    moveCrash() {
        this.frameRow = 1;
        this.y++;
        this.x++;
       if (this.y > this.game.gameHeight - this.checkHeight) {
            this.y = this.game.gameHeight - this.checkHeight;
                    this.x--;
        }
    }

    draw(context) {
        // context.strokeRect(this.x, this.y, this.checkWidth, this.checkHeight);

        context.drawImage(this.image,

            this.frameColumn * this.frameWidth,

            this.frameHeight * this.frameRow,

            this.frameWidth, this.frameHeight,

            this.x, this.y, this.width, this.height);
    }
}