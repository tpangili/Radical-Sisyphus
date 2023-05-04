// Thurmann Pangilinan
// Radical Sisyphus
// 1,000,000 hours
//
// Creative Tilt Justification:
// I will do a corny 90's cartoon style
// rap retelling the Greek myth of Sisyphus.
// Technical Tilt Justification:
// I will add a combat system that involves using
// the boulder as a projectile.

// more strict about accuracy
'use strict';

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 960,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Menu, Play ]
}

// create game object
let game = new Phaser.Game(config);
// reserve keyboard names
let keyF, keyR, keyM, keyLEFT, keyRIGHT;
// set UI sizes
//let borderUISize = game.config.height / 15;
//let borderPadding = borderUISize / 3;