// enemy.js

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture='slime_green') {
    super(scene, x, y, texture, 0);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
  }
}