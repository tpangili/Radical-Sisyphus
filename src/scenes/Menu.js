class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        // load title screen image
    }

    create() {
        // Adds tile sprite for the title screen

        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '24px',
            color: '#FFFFFF',
            stroke: '#FFFFFF',
            strokeThickness: 1,
            align: 'right',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 0
        }

        // show menu text

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // menu background music
        this.music = this.sound.add('bgm_menu');
        let musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.music.play(musicConfig);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
                alienSpeed: 5,
                spaceshipSpeed: 3,
                gameTimer: 60000,
                speedTimer: 30000,   // Time until speed increases
            }
            this.sound.play('sfx_select');
            this.music.stop();
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
                alienSpeed: 6,
                spaceshipSpeed: 4,
                gameTimer: 45000,
                speedTimer: 30000,  // Time until speed increases
            }
            this.sound.play('sfx_select');
            this.music.stop();
            this.scene.start('playScene');
        }
    }
}