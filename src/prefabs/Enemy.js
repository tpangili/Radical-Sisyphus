class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        // call Phaser Physics Sprite constructor
        super(scene, Phaser.Math.Between(playerHeight/2, game.config.width - playerHeight/2), -playerHeight, 'enemy_atlas', 'enemy_0'); 
        
        this.parentScene = scene;               // maintain scene context

        // set up physics sprite
        this.parentScene.add.existing(this);    // add to existing scene, displayList, updateList
        this.parentScene.physics.add.existing(this);    // add to physics system
        this.setImmovable();
        this.e_velocity = velocity;  
        this.setCollideWorldBounds(false);                  
        this.newEnemy = true;                 // custom property to control barrier spawning
        this.enemyDefeat = false;             // custom property to control defeated enemy behavior
    }

    update() {
        // add new enemy when existing enemy hits the bottom of the screen
        /*if(this.newEnemy && this.y > game.config.height - 130) {
            // (recursively) call parent scene method from this context
            this.parentScene.addEnemy(this.parent, this.velocity);
            this.newEnemy = false;
        }*/

        if(!this.enemyDefeat) {
            this.parentScene.physics.moveTo(this, this.x, game.config.height, this.e_velocity);
            this.play('slither', true);
        }
        else {
            this.parentScene.physics.moveTo(this, this.x, 0, 1500);
            this.play('defeat', true);
        }

        // debug feature to check enemy position
        /*console.log('X: ' + this.x);
        console.log('Y: ' + this.y);*/

        // destroy enemy if it reaches the bottom of the screen
        if(this.y >= game.config.height) {
            this.destroy();
        }
        // destroy enemy if it reaches the top of the screen after getting hit
        if(this.enemyDefeat && this.y <= 0) {
            this.destroy();
        }
    }
}