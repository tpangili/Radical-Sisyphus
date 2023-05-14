class Help extends Phaser.Scene {
    constructor() {
        super("helpScene");
    }

    create() {
        // Adds sprite for the help screen
        this.help_screen = this.add.sprite(0, 0, 'help_atlas', 'help_0').setOrigin(0, 0);

        // variable to track current page number
        this.page = 0;

        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();
        // add WASD support
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update() {
        // go to the next help page
        if (Phaser.Input.Keyboard.JustDown(cursors.right) || Phaser.Input.Keyboard.JustDown(keyD)) {
            // go to next frame
            this.sound.play('sfx_select');
            this.page += 1;
        }

        // if statement for each page
        if (this.page == 1) {
            this.help_screen.setFrame('help_1');
        }
        else if (this.page == 2) {
            this.help_screen.setFrame('help_2');
        }
        else if (this.page >= 3) {
            this.scene.start('menuScene');
        }
    }
}