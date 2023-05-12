class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // loading bar
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            loadingBar.fillRect(0, centerY, w * value, 5);  // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

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
            }
        }
        this.add.text(30, centerY + 80, ' "One must imagine Sisyphus ', menuConfig);
        this.add.text(30, centerY + 130, ' is a totally bodacious bro!"', menuConfig);
        this.add.text(30, centerY + 180, '           - Cowabunga Camus', menuConfig);

        this.load.path = './assets/';
        // load graphics assets
        this.load.image('title', 'img/title_screen.png');
        this.load.image('squish', 'img/squish.png');
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
        this.load.audio('bgm_menu', 'audio/Aces_High.mp3');
        this.load.audio('bgm_play', 'audio/Protofunk.mp3');
        this.load.audio('sfx_select', 'audio/select.wav');
        this.load.audio('sfx_radical', 'audio/radical_voice.mp3');
        this.load.audio('sfx_highscore', 'audio/highscore_voice.mp3');
        this.load.audio('sfx_punch', 'audio/punch_sound.mp3');
        this.load.audio('sfx_smack', 'audio/smack.wav');
        this.load.audio('sfx_pillar', 'audio/pillar_hit.mp3');
        this.load.audio('sfx_yell', 'audio/man_yell.mp3');
        this.load.audio('sfx_squish', 'audio/squish.mp3');
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