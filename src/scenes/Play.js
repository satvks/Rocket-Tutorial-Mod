console.log("In Play");
class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('starfield', 'assets/starfield.png');
        this.load.image('spaceship', 'assets/spaceship.png');
        this.load.image('rocket', 'assets/rocket.png');
        this.load.spritesheet('explosion', 'assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.audio('sfx_rocket', 'assets/rocket_shot.wav');
        this.load.audio('sfx_explosion', 'assets/explosion38.wav');
    }

    create() {

        // initialize score
        this.p1Score = 0;
        this.gameOver = false;
        // initialises explosion animation
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        this.starfield = this.add.tileSprite(
            0, 0, 640, 480, 'starfield'
            ).setOrigin(0,0);
        // create player
        this.p1Rocket = new Rocket(
            this,
            game.config.width / 2,
            game.config.height - borderUISize - borderPadding,
            'rocket'
        );
        
        this.ship01 = new Ship(
            this,
            100,
            200,
            'spaceship',
            0,
            125
        );

        this.ship02 = new Ship(
            this, 
            300, 
            280,
            'spaceship',
            0,
            110
            ).setOrigin(0,0);
        
        this.ship03 = new Ship(
            this,
            game.config.width,
            borderUISize*6 + borderPadding*4,
            'spaceship',
            0,
            100
            ).setOrigin(0,0);

        // green UI background
        this.add.rectangle(
            0,
            borderUISize + borderPadding,
            game.config.width,
            borderUISize * 2,
            0x00FF00,
            ).setOrigin(0,0);

        // white borders
	    this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        
        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(60000, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(R)estart', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F); // fire
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R); // reset
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT); // move left
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT); // move right

        
    }

    update() {
        this.starfield.tilePositionX -= 4;
        if(!this.gameOver) {
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update(); 
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if(this.checkCollision(this.p1Rocket, this.ship01) == true) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02) == true) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship03) == true) {
            this.p1Rocket.reset();    
            this.shipExplode(this.ship03); 
        }  
    }

    checkCollision(rocket, ship) {
        if(rocket.x + rocket.width > ship.x &&
            rocket.x < ship.x + ship.width &&
            rocket.y + rocket.height > ship.y &&
            rocket.y < ship.y + ship.width) {
                return true;
            }
        else {
            return false;
        }
    }

    shipExplode(ship) {
        this.sound.play('sfx_explosion');
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          boom.destroy();                       // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += ship.pointValue;
        this.scoreLeft.text = this.p1Score;       
    }
}