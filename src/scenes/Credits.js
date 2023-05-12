class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    create() {
        // Adds tilesprite for the credits screen
        this.credits_screen = this.add.tileSprite(0, 0, 640, 780, 'credits').setOrigin(0, 0);

        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        // go back to menu scene
        if (Phaser.Input.Keyboard.JustDown(cursors.left)) {
            this.sound.play('sfx_select');
            this.scene.start('menuScene');
        }
    }
}