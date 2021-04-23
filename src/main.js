let config = {
    type: Phaser.CANVAS,
    width: 840,
    height: 480,
    scene: [Menu, Play],
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyLEFT, keyRIGHT, keyUP, keyR, keyM, keyS,
    keyA, keyD, keyW;
let particles, emitter;