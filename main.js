// Project: Make A Fake
// Name: Jonathan Ng
// Game Title: Beetman

// phaser components used:
// physics
// camera
// text
// timers

'use strict'

const config = {
    parent: 'phaser-game',  // for info text
    type: Phaser.AUTO,
    width: 1900,
    height: 890,
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    scene: [ Menu , Play, Credits, Instructions ]
}

const game = new Phaser.Game(config)

let keyENTER, keyLEFT, keyRIGHT 

