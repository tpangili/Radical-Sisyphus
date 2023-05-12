class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        // Adds tile sprite for the title screen
        this.title_screen = this.add.tileSprite(0, 0, 640, 780, 'title').setOrigin(0, 0);

        // checks if player has pressed start
        this.start = false;

        // menu text configuration
        let menuConfig = {
            fontFamily: 'Georgia',
            fontSize: '40px',
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
        this.add.text(centerX - 170, centerY + 180, 'Press Space to start', menuConfig);
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
        if (Phaser.Input.Keyboard.JustDown(keySpace) && !this.start) {
            // starts the game
            this.music.stop();
            this.start = true;
            this.sound.play('sfx_select');
            this.sound.play('sfx_radical');
            this.time.delayedCall(1500, () => { 
                this.scene.start('playScene'); 
            });
            //this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyH) && !this.start) {
            // Display help/instructions
            this.music.stop();
            this.sound.play('sfx_select');
            this.sound.play('sfx_help');
            this.scene.start('helpScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyC) && !this.start) {
            // Display credits
            this.music.stop();
            this.sound.play('sfx_select');
            this.sound.play('sfx_credits');
            this.scene.start('creditsScene');
        }
    }
}