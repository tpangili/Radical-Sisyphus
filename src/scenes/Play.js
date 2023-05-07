class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        // place tile sprites

        // background music
        //let music = this.sound.add('bgm_normal');
        //music.play();

        // define keys

         // set up player paddle (physics sprite) and set properties
         player = this.physics.add.sprite(centerX, (h - 100), 'sisyphus').setOrigin(0.5);
         player.setCollideWorldBounds(true);
         player.setImmovable();
         player.setMaxVelocity(600, 0);
         player.setDragX(200);
         player.setDepth(1);             // ensures that paddle z-depth remains above shadow paddles
         player.destroyed = false;       // custom property to track player life
 
         // set up barrier group
         /*this.barrierGroup = this.add.group({
             runChildUpdate: true    // make sure update runs on group children
         });*/
         // wait a few seconds before spawning barriers
         /*this.time.delayedCall(2500, () => { 
             this.addBarrier(); 
         });*/
 
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
     /*addBarrier() {
         let speedVariance =  Phaser.Math.Between(0, 50);
         let barrier = new Barrier(this, this.barrierSpeed - speedVariance);
         this.barrierGroup.add(barrier);
     }*/

    update() {
        // check key input for restart

         // make sure player is still alive
         if(!player.destroyed) {
            // check for arrow key input
            if(cursors.left.isDown) {
                player.body.velocity.x -= playerVelocity;
            } else if(cursors.right.isDown) {
                player.body.velocity.x += playerVelocity;
            } else {
                player.body.velocity.x = 0;
            }
            // check for collisions
            //this.physics.world.collide(player, this.barrierGroup, this.playerCollision, null, this);
        }
    }
}