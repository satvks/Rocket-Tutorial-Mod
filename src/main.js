// modifications:
// Simultaneous Multiplayer (30)
// New Artwork (20)
// New, Fast Spaceship (bad_kitty) (20)
// Parallax Scrolling (10)
// 4 New sfx explosions on random (10)
// Allow Player control after firing (5)
// Bg music (5)

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