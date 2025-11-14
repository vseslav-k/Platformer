export default class coin extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, player, x, y) {
        super(scene, x, y, 'coin', 0);
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setSize(8, 8).setOffset(4, 4); // should modify to be ~1 pixel tall and < 1 pixel wide
        this.setDepth(22);    
        this.body.setAllowGravity(false);
        scene.physics.add.collider(player, this, () => {
          this.pickup();
        });
    }


    pickup(){
        this.scene.sound.play('coin');    
        this.destroy();
    }
}