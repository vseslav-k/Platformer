// knight.js
// This is the player sprite that the player can control.
// Left and right: A D
// Jump: Space
// Attack: Left click (Vee you can decide this one since ur making the enemy level)

export default class Knight extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'knight', 0);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.speed = 150;
        this.setCollideWorldBounds(true);
        this.setMaxVelocity(300, 1000);
        this.setDragX(1200);
        this.body.setSize(18, 28).setOffset(7, 4); // should modify to be ~1 pixel tall and < 1 pixel wide
        this.coyoteTime = 200;
        this.coyoteTimeCounter = 0; //ms

        // CONTROLS
        this.keys = scene.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            jump: Phaser.Input.Keyboard.KeyCodes.SPACE
        });

        this.body.setSize(10, 20, true);
        this.body.setOffset(12, 8);
    }   

    // Ground collision
    get onGround() {
        return this.body.blocked.down || this.body.touching.down; // taught in lecture
    }

    preUpdate(time, delta) {
        console.log(this.coyoteTimeCounter);
        if(this.onGround){ this.coyoteTimeCounter = 0;}
        else{this.coyoteTimeCounter += delta;}
        
        // Horizontal
        if (this.keys.left.isDown) {
            this.setAccelerationX(-this.speed * 5);
            this.setFlipX(true);
        } else if (this.keys.right.isDown) {
            this.setAccelerationX(this.speed * 5);
            this.setFlipX(false);
        } else {
            this.setAccelerationX(0);
        }

        // Jump (grounded only)
        if (Phaser.Input.Keyboard.JustDown(this.keys.jump) && (this.onGround || this.coyoteTimeCounter < this.coyoteTime)) {
            this.setVelocityY(-520);
            this.scene.sound.play('jump', { volume: 0.5 }); // harmless if not preloaded
        }

        // Anti wall-sticking when airborne and pushing into a wall
        if (!this.onGround && (this.body.blocked.left || this.body.blocked.right)) {
            this.setAccelerationX(0);
            this.setVelocityX(0);
        }
    }
}
