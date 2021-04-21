
class Ship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.pointValue = pointValue;
    }

    update() {
        this.x -= 3;
        if(this.x < 0 - this.width) {
            this.x = game.config.width;
        }
    }

    reset() {
        this.x = game.config.width + 40;
        var randomN = Math.floor(Math.random() * 41) - 20;
        this.y = this.y + randomN;
        this.alpha = 1;
    }
      
}