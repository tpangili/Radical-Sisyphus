class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
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
            align: 'center',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 0
        }

        // show menu text
        this.add.text(centerX - 100, centerY, 'Radical Sisyphus', menuConfig);

        // define keys
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);

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
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            // starts the game
            //this.sound.play('sfx_select');
            //this.music.stop();
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyH)) {
            // Display help/instructions
        }
    }
}