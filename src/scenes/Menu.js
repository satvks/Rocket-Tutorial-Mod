
class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.audio('music', 'assets/space_wave.wav')
        this.load.image('starfield', 'assets/starfield.png');
        this.load.image('sky', 'assets/sky2.png');
        this.load.image('midground', 'assets/cloud1.png');
        this.load.image('foreground', 'assets/cloud2.png');
    }
    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }

        this.playMusic();

        this.starfield = this.add.tileSprite(
            0, 0, 840, 480, 'starfield'
            ).setOrigin(0,0);
        
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
            borderPadding, 'NYAN CATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 , 'Use <--> to move and ^ (UP ARROW) To Fire',
            menuConfig).setOrigin(0.5);

        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';

        this.add.text(game.config.width/2, game.config.height/2 + borderUISize +
            borderPadding, 'Press S to start' , menuConfig).setOrigin(0.5);

        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    }

    update() {
        this.starfield.tilePositionX -= 4;
        if(Phaser.Input.Keyboard.JustDown(keyS)) {
            this.scene.start("playScene");
        }
    }

    playMusic() {
        if (!this.music) {
            this.music = this.sound.add('music', {loop: true});
            this.music.play();
        }
    }

}