class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        // Adds tile sprite for the title screen
        this.title_screen = this.add.tileSprite(0, 0, 640, 780, 'title').setOrigin(0, 0);

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
        this.add.text(centerX - 200, centerY + 200, 'Press Space to start', menuConfig);
        this.add.text(centerX - 100, centerY + 250, '(H) for help', menuConfig);
        this.add.text(centerX - 100, centerY + 300, '(C) for credits', menuConfig);

        // define keys
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

        // menu background music
        this.music = this.sound.add('bgm_menu');
        let musicConfig = {
            mute: false,
            volume: 0.5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.music.play(musicConfig);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            // starts the game
            //this.sound.play('sfx_select');
            this.music.stop();
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyH)) {
            // Display help/instructions
        }
        if (Phaser.Input.Keyboard.JustDown(keyC)) {
            // Display credits
            //
            // "Aces High" Kevin MacLeod (incompetech.com)
            // Licensed under Creative Commons: By Attribution 4.0 License
            // http://creativecommons.org/licenses/by/4.0/
            //
            // "Protofunk" Kevin MacLeod (incompetech.com)
            // Licensed under Creative Commons: By Attribution 4.0 License
            // http://creativecommons.org/licenses/by/4.0/
        }
    }
}