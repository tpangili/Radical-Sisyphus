class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        // reset parameters
        this.barrierSpeed = 450;
        this.barrierSpeedMax = 1000;

        // account for higher refresh rates
        //this.physics.world.setFPS(60);

        // place tile sprites
        this.mountain = this.add.tileSprite(0, 0, 640, 780, 'mountain').setOrigin(0, 0);

        // background music
        //let music = this.sound.add('bgm_normal');
        //music.play();

        // define keys
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // set up player (physics sprite) and set properties
        player = this.physics.add.sprite(centerX, (h - 100), 'sisyphus').setOrigin(0.5);
        player.setCollideWorldBounds(true);
        player.setSize(80, 96);
        player.setImmovable();
        player.setMaxVelocity(600, 600);
        player.setDepth(2);
        player.destroyed = false;       // custom property to track player life
        //player.current_x = centerX;
        //player.current_y = h - 100;

        // set up boulder (physics sprite) and set properties
        boulder = this.physics.add.sprite(player.body.x - 8, player.body.y - 20, 'boulder').setOrigin(0.5);
        boulder.setCollideWorldBounds(true);
        boulder.setImmovable();
        boulder.setDepth(1);
        boulder.setBounce(1);
        boulder.setMaxVelocity(1000, 1000);
        boulder.setCircle(48);
        boulder.launched = false;      // custom property to track boulder state
 
        // set up barrier group
        this.barrierGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });
        // wait a few seconds before spawning barriers
        this.time.delayedCall(2500, () => { 
            this.addBarrier(); 
        });
 
        // set up difficulty timer (triggers callback every second)
        this.difficultyTimer = this.time.addEvent({
            delay: 1000,
            callback: this.levelBump,
            callbackScope: this,
            loop: true
        });
 
        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();
     }
 
     // create new barriers and add them to existing barrier group
     addBarrier() {
         let speedVariance =  Phaser.Math.Between(0, 50);
         let barrier = new Barrier(this, this.barrierSpeed - speedVariance);
         this.barrierGroup.add(barrier);
     }

    update() {
        // check key input for restart

        // scroll tile sprite
        this.mountain.tilePositionY -= 4;

        // keeps boulder in front of player
        boulder.body.x = (player.body.x - 8);
        //boulder.body.y = player.body.y - 10;

        // make sure player is still alive
        if(!player.destroyed) {
            // check for arrow key input
            if(cursors.left.isDown && !boulder.launched) {
                player.body.velocity.x -= playerVelocity;
            } else if(cursors.right.isDown && !boulder.launched) {
                player.body.velocity.x += playerVelocity;
            } else {
                player.body.velocity.x = 0;
            }

            // check for space bar input
            if (Phaser.Input.Keyboard.JustDown(keySpace) && !boulder.launched) {
                // launches the boulder forward
                this.physics.moveTo(boulder, player.body.x, player.body.y - 100, 1000);
                boulder.launched = true;
            }

            if (boulder.launched && boulder.body.y >= player.body.y - 10) {
                boulder.launched = false;
                boulder.body.velocity.y = 0;
                boulder.body.y = player.body.y - 50;
            }

            // check for collisions
            this.physics.world.collide(boulder, this.barrierGroup, this.boulderCollision, null, this);
            this.physics.world.collide(player, this.barrierGroup, this.boulderCollision, null, this);
        }
    }

    boulderCollision() {
        player.destroyed = true;                    // turn off collision checking
        this.difficultyTimer.destroy();             // shut down timer
        //this.sound.play('death', { volume: 0.25 }); // play death sound
        this.cameras.main.shake(2500, 0.0010);      // camera death shake
       
        // send boulder down
        boulder.setCollideWorldBounds(false);
        player.setCollideWorldBounds(false);
        player.setBounce(1);
        this.physics.moveTo(boulder, player.body.x, game.config.height, 1000);
        this.physics.moveTo(player, player.body.x, game.config.height, 1000);


        // switch states after timer expires
        this.time.delayedCall(1000, () => { 
            this.scene.start('gameOverScene');
        });
    }

    enemyCollision() {
        //this.barrier.destroy();
        this.physics.moveTo(boulder, player.body.x, player.body.y - 10, 1000);
    }
}