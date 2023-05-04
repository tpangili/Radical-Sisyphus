class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        // load texture atlases
    }

    create() {
        // place tile sprites

        // background music
        let music = this.sound.add('bgm_normal');
        music.play();

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        // check key input for restart
    }
}