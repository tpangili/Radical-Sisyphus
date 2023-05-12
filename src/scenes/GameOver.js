class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene");
    }

    create() {
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Georgia',
            fontSize: '30px',
            color: '#FFFFFF',
            stroke: '#FFFFFF',
            strokeThickness: 1,
            align: 'center',
            padding: {
                top: 5,
                bottom: 5
            }
        }

        // play comedic sound effect
        this.sound.play('sfx_squish');

        // check for high score in local storage
        if(localStorage.getItem('hiscore') != null) {
            let storedScore = parseInt(localStorage.getItem('hiscore'));
            // see if current score has surpassed the stored high score
            if(score > storedScore) {
                localStorage.setItem('hiscore', score.toString());
                highScore = score;
                newHighScore = true;
                this.sound.play('sfx_highscore');
            }
            else {
                highScore = parseInt(localStorage.getItem('hiscore'));
                newHighScore = false;
            }
        }
        // set current score as first high score
        else {
            highScore = score;
            localStorage.setItem('hiscore', highScore.toString());
            newHighScore = true;
            this.sound.play('sfx_highscore');
        }

        // show score text
        this.scroll = this.add.image(centerX, centerY - 150, 'squish');
        this.add.text(centerX - 150, centerY - 80, 'GAME OVER, DUDE...', menuConfig);
        this.add.text(centerX - 200, centerY + 30, `Total Score: ${score}`, menuConfig);
        this.add.text(centerX - 200, centerY + 80, `High Score: ${highScore}`, menuConfig);
        // show options
        this.add.text(centerX, centerY + 200, 'Press Space to try again', menuConfig).setOrigin(0.5, 0.5);
        this.add.text(centerX, centerY + 250, 'OR', menuConfig).setOrigin(0.5, 0.5);
        this.add.text(centerX, centerY + 300, 'Press (M) to go back to menu', menuConfig).setOrigin(0.5, 0.5);

        // define keys
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            // starts the game again
            this.game.sound.stopAll();
            this.sound.play('sfx_select');
            //this.music.stop();
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            // goes back to the menu
            this.game.sound.stopAll();
            this.sound.play('sfx_select');
            //this.music.stop();
            this.scene.start('menuScene');
        }
    }
}