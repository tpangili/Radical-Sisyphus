class Barrier extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        // call Phaser Physics Sprite constructor
        super(scene, Phaser.Math.Between(96/2, game.config.width - 96/2), -96, 'barrier'); 
        
        this.parentScene = scene;               // maintain scene context

        // set up physics sprite
        this.parentScene.add.existing(this);    // add to existing scene, displayList, updateList
        this.parentScene.physics.add.existing(this);    // add to physics system
        this.setImmovable();
        this.b_velocity = velocity;  
        this.setCollideWorldBounds(false);                  
        this.newBarrier = true;                 // custom property to control barrier spawning
    }

    update() {
        // add new barrier when existing barrier hits center Y
        if(this.newBarrier && this.y > game.config.height - 96) {
            // (recursively) call parent scene method from this context
            this.parentScene.addBarrier(this.parent, this.velocity);
            this.newBarrier = false;
        }

        this.parentScene.physics.moveTo(this, this.x, game.config.height, this.b_velocity);

        console.log('X: ' + this.x);
        console.log('Y: ' + this.y);

        // destroy barrier if it reaches the bottom of the screen
        if(this.y >= game.config.height) {
            this.destroy();
        }
    }
}