class Barrier extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        // call Phaser Physics Sprite constructor
        super(scene, Phaser.Math.Between(playerHeight/2, game.config.width - playerHeight/2), -96, 'barrier'); 
        
        this.parentScene = scene;               // maintain scene context

        // set up physics sprite
        this.parentScene.add.existing(this);            // add to existing scene, displayList, updateList
        this.parentScene.physics.add.existing(this);    // add to physics system
        this.setImmovable();
        this.b_velocity = velocity;  
        this.setCollideWorldBounds(false);                  
        this.newBarrier = true;                 // custom property to control barrier spawning
        this.newEnemy = true;                   // custom property to control enemy spawning
    }

    update() {
        // add new barrier when existing barrier hits the bottom of the screen
        if(this.newEnemy && this.y > centerY + 200) {
            // (recursively) call parent scene method from this context
            //this.parentScene.addBarrier(this.parent, this.velocity);
            this.parentScene.addEnemy();
            this.newEnemy = false;
        }
        // add new enemy when existing barrier hits center Y
        if(this.newBarrier && this.y > centerY) {
            // (recursively) call parent scene method from this context
            this.parentScene.addBarrier(this.parent, this.velocity);
            //this.parentScene.addEnemy();
            this.newBarrier = false;
        }

        this.parentScene.physics.moveTo(this, this.x, game.config.height, this.b_velocity);

        // debug feature to check barrier position
        /*console.log('X: ' + this.x);
        console.log('Y: ' + this.y);*/

        // destroy barrier if it reaches the bottom of the screen
        if(this.y >= game.config.height) {
            this.destroy();
        }
    }
}