
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {  // scene - Menu/Play, (x, y)
        super(scene, x, y, texture, frame);     // texture - prefab, frame - state?
        scene.add.existing(this);
        this.movementSpeed = 3;
        this.isFiring = false;
        this.isFiring2 = false;
        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
    }
    
    create(){}

    update() {
        if(this.isFiring){
            this.y -= this.movementSpeed;
            if(keyLEFT.isDown) {
                this.x -= this.movementSpeed;
            }
            if(keyRIGHT.isDown) {
                this.x += this.movementSpeed;
            }
                if(this.y < borderUISize*3){
                    this.y = game.config.height-borderUISize-borderPadding;
                    this.isFiring = false;
                }
        }else{
            if(keyLEFT.isDown) {
                this.x -= this.movementSpeed;
            }
            if(keyRIGHT.isDown) {
                this.x += this.movementSpeed;
            }
            if(Phaser.Input.Keyboard.JustDown(keyUP) ){
                this.sfxRocket.play();  // play sfx
                this.isFiring = true;
            }
        this.x = Phaser.Math.Clamp(this.x, borderUISize + borderPadding, game.config.width-borderUISize-borderPadding);
        }
    }

    update2() {
        if(this.isFiring2){
            this.y -= this.movementSpeed;
            if(keyA.isDown) {
                this.x -= this.movementSpeed;
            }
            if(keyD.isDown) {
                this.x += this.movementSpeed;
            }
                if(this.y < borderUISize*3){
                    this.y = game.config.height-borderUISize-borderPadding;
                    this.isFiring2 = false;
                }
        }else{
            if(keyA.isDown) {
                this.x -= this.movementSpeed;
            }
            if(keyD.isDown) {
                this.x += this.movementSpeed;
            }
            if( Phaser.Input.Keyboard.JustDown(keyW) ){
                this.sfxRocket.play();  // play sfx
                this.isFiring2 = true;
            }
        this.x = Phaser.Math.Clamp(this.x, borderUISize + borderPadding, game.config.width-borderUISize-borderPadding);
        }
    }

    reset() {
        this.y = game.config.height-borderUISize-borderPadding;
        this.isFiring = false;
        this.isFiring2 = false;
    }
}