// Thurmann Pangilinan
// Radical Sisyphus
// 1,000,000 hours
//
// Creative Tilt Justification:
// I will do some voice acting for
// the player character.
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
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let w = game.config.width;
let h = game.config.height;
const textSpacer = 64;
let level;
let highScore;
let newHighScore = false;
let cursors;