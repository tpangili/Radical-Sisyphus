class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        // reset parameters
        this.barrierSpeed = 450;
        this.enemySpeed = 500;
        this.barrierSpeedMax = 950;
        this.enemySpeedMax = 1000
        this.boulderSpeed = 1150;
        this.scrollSpeed = 4;
        level = 0;
        score = 0;

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

        // set up boulder (physics sprite) and set properties
        boulder = this.physics.add.sprite(player.body.x - 8, player.body.y - 5, 'boulder').setOrigin(0.5);
        boulder.setCollideWorldBounds(true);
        boulder.setImmovable();
        boulder.setDepth(1);
        boulder.setBounce(1);
        boulder.setMaxVelocity(1000, 1250);
        boulder.setCircle(48);
        boulder.launched = false;      // custom property to track boulder state
 
        // set up barrier group
        this.barrierGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });
        // set up enemy group
        this.enemyGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });

        // wait a few seconds before spawning barriers
        this.time.delayedCall(2500, () => { 
            this.addBarrier(); 
        });
        // wait a few seconds before spawning enemies
        this.time.delayedCall(5000, () => { 
            this.addEnemy(); 
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

        // Adds UI elements
        this.scroll = this.add.image(0, 0, 'ui').setOrigin(0, 0);
        this.scroll.setDepth(2);

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '30px',
            color: '#000080',
            stroke: '#000080',
            strokeThickness: 1,
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            }
        }
        this.scoreText = this.add.text(playerHeight/2, playerHeight/2 - 15, 'SCORE: ' + score, scoreConfig);
        this.scoreText.setDepth(4);
     }
 
     // create new barriers and add them to existing barrier group
     addBarrier() {
         let speedVariance =  Phaser.Math.Between(0, 50);
         let barrier = new Barrier(this, this.barrierSpeed - speedVariance);
         //console.log(`INSIDE BARRIER FUNCTION: barrier speed: ${this.barrierSpeed}`);
         barrier.setDepth(0);
         this.barrierGroup.add(barrier);
     }

     // create new enemies and add them to existing barrier group
     addEnemy() {
        let speedVariance =  Phaser.Math.Between(0, 50);
        let enemy = new Enemy(this, this.enemySpeed - speedVariance);
        enemy.setDepth(1);
        //console.log(`INSIDE ENEMY FUNCTION: enemy speed: ${this.enemySpeed}`);
        this.enemyGroup.add(enemy);
    }

    update() {
        // scroll tile sprite
        this.mountain.tilePositionY -= this.scrollSpeed;

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
                this.physics.moveTo(boulder, player.body.x, player.body.y - 100, this.boulderSpeed);
                boulder.launched = true;
            }

            if (boulder.launched && boulder.body.y >= player.body.y - 10) {
                boulder.launched = false;
                boulder.body.velocity.y = 0;
                boulder.body.y = player.body.y - 50;
            }

            // check for barrier collisions
            this.physics.world.collide(boulder, this.barrierGroup, this.boulderCollision, null, this);
            this.physics.world.collide(player, this.barrierGroup, this.boulderCollision, null, this);
            // check for enemy collisions
            this.physics.world.collide(boulder, this.enemyGroup, this.boulderCollision, this.enemyCollision, this);
            this.physics.world.collide(player, this.enemyGroup, this.boulderCollision, null, this);
        }
    }

    boulderCollision() {
        player.destroyed = true;                    // turn off collision checking
        this.difficultyTimer.destroy();             // shut down difficulty timer
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

    enemyCollision(object1, object2) {
        if (boulder.launched) {
            object2.enemyDefeat = true;
            score += 5;
            //console.log(score);
            this.physics.moveTo(boulder, player.body.x, player.body.y - 10, this.boulderSpeed);
            return false;
        }
        else {
            return true;
        }
    }

    levelBump() {
        // increment level
        level++;
        // increment score
        score++;
        // update score display
        this.scoreText.text = 'SCORE: ' + score;
        //console.log(score);

        // bump speed every 5 levels (until max is hit)
        if (level % 5 == 0) {
            //console.log(`level: ${level}, barrier speed: ${this.barrierSpeed}, enemy speed: ${this.enemySpeed}`);
            //console.log(`barrier max: ${this.barrierSpeedMax}, enemy max: ${this.enemySpeedMax}`);
            //this.sound.play('clang', { volume: 0.5 });         // play clang to signal speed up
            if (this.barrierSpeed < this.barrierSpeedMax) {     // increase barrier speed
                this.barrierSpeed += 25;
                this.scrollSpeed += 0.25;
            }
            if (this.enemySpeed < this.enemySpeedMax) {         // increase enemy speed
                this.enemySpeed += 25;
                this.scrollSpeed += 0.25;
            }
        }
        //console.log(this.scrollSpeed);
    }
}