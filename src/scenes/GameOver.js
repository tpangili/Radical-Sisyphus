class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene");
    }

    create() {
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '30px',
            color: '#FFFFFF',
            stroke: '#FFFFFF',
            strokeThickness: 1,
            align: 'center',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 0
        }

        // show menu text
        this.add.text(centerX - 200, centerY, 'L + ratio + you died lol', menuConfig);
        this.add.text(centerX - 100, centerY + 200, 'Press (R) to try again', menuConfig);

        // define keys
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        // menu background music
        /*this.music = this.sound.add('bgm_menu');
        let musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.music.play(musicConfig);*/
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            // starts the game
            //this.sound.play('sfx_select');
            //this.music.stop();
            this.scene.start('playScene');
        }
    }
}