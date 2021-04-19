
class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
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

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
            borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 , 'Use <--> to move and (F) to fire',
            menuConfig).setOrigin(0.5);

        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';

        this.add.text(game.config.width/2, game.config.height/2 + borderUISize +
            borderPadding, 'Press S to start' , menuConfig).setOrigin(0.5);

        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyS)) {
            this.scene.start("playScene");
        }
    }

}