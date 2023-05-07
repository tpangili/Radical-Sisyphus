class Barrier extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        // call Phaser Physics Sprite constructor
        super(scene, game.config.width + paddleWidth, Phaser.Math.Between(paddleHeight/2, game.config.height - paddleHeight/2), 'paddle'); 
        
        this.parentScene = scene;               // maintain scene context

        // set up physics sprite
        this.parentScene.add.existing(this);    // add to existing scene, displayList, updateList
        this.parentScene.physics.add.existing(this);    // add to physics system
        this.setVelocityY(velocity);            // make it go!
        this.setImmovable();                    
        this.newBarrier = true;                 // custom property to control barrier spawning
    }

    update() {
        // add new barrier when existing barrier hits center X
        if(this.newBarrier && this.y < centerY) {
            // (recursively) call parent scene method from this context
            this.parentScene.addBarrier(this.parent, this.velocity);
            this.newBarrier = false;
        }

        // destroy barrier if it reaches the bottom of the screen
        if(this.y < -this.height) {
            this.destroy();
        }
    }
}