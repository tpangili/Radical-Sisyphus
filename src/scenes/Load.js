class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            loadingBar.fillRect(0, centerY, w * value, 5);  // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        this.load.path = './assets/';
        // load graphics assets
        this.load.image('title', 'img/title_screen.png');
        this.load.image('mountain', 'img/mountain.png');
        this.load.image('ui', 'img/scroll_ui.png');
        this.load.image('sisyphus', 'img/sisyphus_back.png');
        this.load.image('boulder', 'img/boulder.png');
        this.load.image('barrier', 'img/pillar.png');
        this.load.image('enemy', 'img/enemy.png');
        // load texture atlases
        this.load.atlas('enemy_atlas', 'img/enemy_atlas.png', 'img/enemy.json');
        this.load.atlas('boulder_atlas', 'img/boulder_atlas.png', 'img/boulder.json');
        this.load.atlas('sisyphus_atlas', 'img/sisyphus_atlas.png', 'img/sisyphus.json');
        // load audio assets
        // load font
    }

    create() {
        // check for local storage browser support
        if(window.localStorage) {
            console.log('Local storage supported');
        } else {
            console.log('Local storage not supported');
        }

        // go to Menu scene
        this.scene.start('menuScene');
    }
}