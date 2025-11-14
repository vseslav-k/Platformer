import LevelBase from './levelBase.js';
import Knight from '../objects/knight.js';
import Ladder from '../objects/ladder.js';
export default class StartEnemyLevel extends Phaser.Scene {
  constructor(){ super('StartEnemyLevel'); }

  preload() {
  }

  create() {
        this.player = new Knight(this, 64, 700);


        const map = this.make.tilemap({ key: "StartEnemyLevel" });
        const tileset = map.addTilesetImage("world_tileset", "world_tileset");

        console.log(map);

        this.layers = {};
        // create layers
        this.layers["background"] = map.createLayer("background", tileset, 0, 0);
        this.layers["ground"]     = map.createLayer("ground",     tileset, 0, 0);
        this.layers["decorations"]= map.createLayer("decorations",tileset, 0, 0);
        this.layers["danger"] = map.createLayer("danger", tileset, 0, 0);
        

        // enable collision only on ground + platform
        this.layers["ground"].setCollisionByExclusion([-1]);
        this.layers["danger"].setCollisionByExclusion([-1]);
        this.player.depth = 10;

        // add collisions with player
        this.physics.add.collider(this.player, this.layers["ground"]);
        this.physics.add.collider(this.player, this.layers["danger"], () => {
          this.player.die();
        });

        // camera bounds — optional
        this.cameras.main.setBounds(0, 0, map.widthInPixels+500, map.heightInPixels+500);
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(1.5);

        this.ladder1 = new Ladder(733, 538, 111, 16, this.player);
        this.ladder2 = new Ladder(93, 324, 200, 20, this.player);

    }

    update() {
      this.ladder1.update();
      this.ladder2.update();
        
    }
  
}
