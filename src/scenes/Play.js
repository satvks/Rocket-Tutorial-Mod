console.log("In Play");
class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('starfield', 'assets/starfield.png');
        this.load.image('midground', 'assets/sky_mid.png');
        this.load.image('foreground', 'assets/sky_low.png');
        this.load.image('spaceship', 'assets/spaceship.png');
        this.load.image('rocket', 'assets/rocket.png');
        this.load.spritesheet('explosion', 'assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.audio('sfx_rocket', 'assets/rocket_shot.wav');
        this.load.audio('sfx_explosion', 'assets/explosion38.wav');
        //particles
        // this.load.image('rainbow_particle', 'assets/lg_part.png');
    }

    create() {
        // const pl = this.add.particles('lg_particle');
        // const pel = pl.createEmitter();
        // pel.setPosition(300, 400);
        // pel.setSpeed(20);
        // pel.setDepth(0);
        
        const width = this.scale.width;
        const height = this.scale.height;
        

        // initialize score
        this.p1Score = 0;
        this.p2Score = 0;

        this.gameOver = false;
        // initialises explosion animation
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        //snorlax elements (parallax)
        this.foreground = this.add.tileSprite(
            borderUISize ,game.config.height/2 -4, 840, 480, 'foreground').setOrigin(0,0);
        this.starfield = this.add.tileSprite(
            0, 0, 840, 160, 'starfield'
            ).setOrigin(0,0);
        this.midground1 = this.add.tileSprite(
            borderUISize, game.config.height/2 -4, width*2, height * 0.33, 'midground'
            );
            
        // create player
        this.p1Rocket = new Rocket(
            this,
            game.config.width / 3,
            game.config.height - borderUISize - borderPadding,
            'rocket'
        );

        this.p2Rocket = new Rocket(
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
        this.scoreRight = this.add.text(borderUISize * 16 + borderPadding, borderUISize + borderPadding*2, this.p2Score, scoreConfig);
        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(15000, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64,
                '(R)estart or (M)enu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP); // fire
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R); // reset
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT); // move left
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT); // move right
        // player 2 keys
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        
    }

    update() {
        this.starfield.tilePositionX -= 4;
        this.midground1.tilePositionX -= 2;
        this.foreground.tilePositionX += 1;
        if(!this.gameOver) {
            this.p1Rocket.update();
            this.p2Rocket.update2();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update(); 
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyM)) {
            this.scene.start("menuScene");
        }

        if(this.checkCollision(this.p1Rocket, this.ship01) == true) {
            this.p1Rocket.reset();
            this.shipExplode2(this.ship01);
        }
        if(this.checkCollision(this.p2Rocket, this.ship01) == true) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02) == true) {
            this.p1Rocket.reset();
            this.shipExplode2(this.ship02);
        }
        if(this.checkCollision(this.p2Rocket, this.ship02) == true) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship03) == true) {
            this.p1Rocket.reset();    
            this.shipExplode2(this.ship03); 
        }  
        if(this.checkCollision(this.p2Rocket, this.ship03) == true) {
            this.p2Rocket.reset();    
            this.shipExplode(this.ship03); 
        }  
    }

    checkCollision(rocket, ship) {
        if(rocket.x + rocket.width > ship.x+25 &&
            rocket.x < ship.x + ship.width+25 &&
            rocket.y + rocket.height > ship.y-40 &&
            rocket.y < ship.y + ship.width-40) {
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
    shipExplode2(ship) {
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
        this.p2Score += ship.pointValue;
        this.scoreRight.text = this.p2Score;       
    }
}