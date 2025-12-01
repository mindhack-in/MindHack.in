export class Pipes {
    constructor(game, type, pipeNo, x) {
        this.game = game;
        this.x = x;
        this.height = this.game.gameHeight * 0.45;
        this.width = 120;
        this.pipeNo = pipeNo;

        if (type === 1) {
            this.flipped = true;
            if (this.pipeNo == 0) {
                this.image = document.getElementById("whitePipeUpper");
            } else if (this.pipeNo == 1) {
                this.image = document.getElementById("greenPipeUpper");
            } else if (this.pipeNo == 2) {
                this.image = document.getElementById("redPipeUpper");
            } 
            this.y=0;
        } else {
            this.flipped = false;
            if (this.pipeNo == 0) {
                this.image = document.getElementById("whitePipeLower");
            } else if (this.pipeNo == 1) {
                this.image = document.getElementById("greenPipeLower");
            } else if (this.pipeNo == 2) {
                this.image = document.getElementById("redPipeLower");
            }
            this.y = this.game.gameHeight - this.height;
        }
        this.markForDeletion = false;
    }

    update() {
        this.x--;
        if (this.x + this.width < 0) this.markForDeletion = true;
    }
    draw(context) {
        // context.strokeRect(this.x, this.y, this.width, this.height);
            context.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.x, this.y, this.width, this.height);
    }
}