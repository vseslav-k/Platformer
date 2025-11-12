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

    this.setCollideWorldBounds(true);
    this.setMaxVelocity(300, 1000);
    this.setDragX(1200);
    this.body.setSize(18, 28).setOffset(7, 4);

    // Input
    this.keys = scene.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      jump: Phaser.Input.Keyboard.KeyCodes.SPACE
    });
  }

  get onGround() {
    return this.body.blocked.down || this.body.touching.down; // taught in lecture
  }

  update() {
    const SPEED = 220;

    // Horizontal
    if (this.keys.left.isDown) {
      this.setAccelerationX(-SPEED * 5);
      this.setFlipX(true);
    } else if (this.keys.right.isDown) {
      this.setAccelerationX(SPEED * 5);
      this.setFlipX(false);
    } else {
      this.setAccelerationX(0);
    }

    // Jump (grounded only)
    if (Phaser.Input.Keyboard.JustDown(this.keys.jump) && this.onGround) {
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
