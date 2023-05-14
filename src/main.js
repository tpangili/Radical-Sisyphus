// Thurmann Pangilinan
// Radical Sisyphus
// 30 hours
//
// Creative Tilt Justification:
// The game has a really great cartoony and goofy
// visual style that I am pretty proud of.
// 
// The game's main concept riffs off of the endless
// and futile nature of Sisyphus's punishment from
// the Greek myth (having to push a boulder up a
// mountain that always falls back down before reaching
// the top) by turning that into an endless runner.
//
// I also did some light voice acting for the main character.
// 
// On the technical side, I was able to implement
// a combat system using the physics system
// that involves using the boulder as a projectile.
// In order to achieve this, I had to do a lot of
// experimentation seeing how I could handle the boulder's
// collision before and after being launched.
//
// I also learned about using additional callback functions
// in collision detection in order to perform additional
// checks involving enemy collision. I had to research
// how the collision detection handles individual
// children from a group so I could make changes to
// individual enemy objects from the enemyGroup.

// more strict about accuracy
'use strict';

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 780,
    fps: {
        target: 60,
        forceSetTimeOut: false
    },
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
            },
            fps: 60
        }
    },
    scene: [ Load, Menu, Help, Credits, Play, GameOver ]
}

// uncomment to clear high score from local storage
//localStorage.clear();

// create game object
let game = new Phaser.Game(config);
// reserve keyboard names
let keySpace, keyH, keyC, keyM, keyA, keyD;
// miscellaneous variables for future scenes
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let w = game.config.width;
let h = game.config.height;
const playerWidth = 96;
const playerHeight = 96;
let player = null;
let boulder = null;
let level;
let score;
let highScore;
let newHighScore = false;
let cursors;
let playerVelocity = 150;