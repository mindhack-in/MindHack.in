class Layer {
    constructor(game, width, height, speedModifier, img) {
        this.game = game;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.image = img;
        this.x = 0;
        this.y = 0;
    }

    update() {
        if(this.x<-this.width){
            this.x=0;            
        }
        else{
           this.x -=(this.game.speed*this.speedModifier);
        }
        
       
    }

    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width - 12, this.y, this.width, this.height);

    }
}


export class Background {
    constructor(game) {
        this.game = game;
        this.width = 1667;
        this.height = 500;
        this.layer1Image = document.getElementById("layer1");
        this.layer1 = new Layer(this.game, this.width, this.height, 0.2, this.layer1Image);
        this.backgroundLayers = [
            this.layer1
            ];
    }

    update() {
        this.backgroundLayers.forEach(layer => {
            layer.update();
        });
    }

    draw(context) {
        this.backgroundLayers.forEach(layer => {
            layer.draw(context);
        });
    }
}