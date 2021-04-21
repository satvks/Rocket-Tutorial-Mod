
class Ship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, speed) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.pointValue = pointValue;
        this.speed = speed;
    }

    update() {
        this.x -= this.speed;
        if(this.x < 0 - this.width) {
            this.x = game.config.width;
        }
    }

    reset() {
        this.x = game.config.width + 40;
        var randomN = Math.floor(Math.random() * 41) - 20;
        this.y = this.y + randomN;
        this.alpha = 1;
        this.speed = this.setspeed();
    }

    setspeed() {
        return Math.random() * 3 + 2;
    }
}