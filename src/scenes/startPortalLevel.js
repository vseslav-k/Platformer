// startPortalLevel.js

import Knight from '../objects/knight.js';
//import Enemy from '../objects/enemy.js';
import Coin from '../objects/coin.js';

export default class StartPortalLevel extends Phaser.Scene {
    constructor() { 
        super('StartPortalLevel'); 
    }

    create() {
        this.player = new Knight(this, 50, 760);
        this.timeTaken = 0;
        this.coinCount = 0; 
        this.physics.add.overlap(this.player, this.portals, this.handlePortalOverlap, null, this);
        // TILEMAP
        const map = this.make.tilemap({key: 'StartPortalLevel' }) // same key from start.js
        const tileset = map.addTilesetImage("world_tileset", "world_tileset");
  
        // LAYERS
        this.layers = {};
        this.layers["background"] = map.createLayer("background", tileset, 0, 0);
        this.layers["ground"] = map.createLayer("ground", tileset, 0, 0);
        this.layers["decorations"]= map.createLayer("decorations",tileset, 0, 0);
        this.layers["danger"] = map.createLayer("danger", tileset, 0, 0);
    
        // COLLISION
        this.layers["ground"].setCollisionByExclusion([-1]);
        this.layers["danger"].setCollisionByExclusion([-1]);
        this.player.depth = 10;
        this.physics.add.collider(this.player, this.layers["ground"]);
        this.physics.add.collider(this.player, this.layers["danger"], () => {this.player.die();});
    
        // CAMERA
        this.cameras.main.setBounds(0, 0, map.widthInPixels+500, map.heightInPixels+500);
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(1.2);

        // PORTALS
        this.portals = [];
        const ob = this.add.sprite(150, 760, 'portal_orange_black').setScale(2); 
        const ow = this.add.sprite(35, 670, 'portal_orange_white').setScale(2);
        const gb = this.add.sprite(750, 750, 'portal_green_black').setScale(2);
        const gw = this.add.sprite(40, 70, 'portal_green_white').setScale(2);
        const bb = this.add.sprite(26, 600, 'portal_blue_black').setScale(2);
        const bw = this.add.sprite(454, 454, 'portal_blue_white').setScale(2);
        this.physics.add.existing(ob, true);
        this.physics.add.existing(ow, true);
        this.physics.add.existing(gb, true);
        this.physics.add.existing(gw, true);
        this.physics.add.existing(bb, true);
        this.physics.add.existing(bw, true);
        this.portals.push(ob, ow, gb, gw, bb, bw); // push elements to end of portals [] array
        ob.depth = ow.depth = gb.depth = gw.depth = bb.depth = bw.depth = 11; // 1 layer in front of the knight

        // TELEPORTATION ...very reduntant code but it gets the job done
        this.physics.add.overlap(this.player, ob, ()=> { 
            this.player.setX(60); this.player.setY(670);
            this.sound.play('teleport');
        }, null, this);

        this.physics.add.overlap(this.player, ow, ()=> { 
            this.player.setX(125); this.player.setY(760);
            this.sound.play('teleport');
        }, null, this);

        this.physics.add.overlap(this.player, gb, ()=> { 
            this.player.setX(65); this.player.setY(70);
            this.sound.play('teleport');
        }, null, this);

        this.physics.add.overlap(this.player, gw, ()=> {
            this.player.setX(725); this.player.setY(750);
            this.sound.play('teleport');
        }, null, this);

        this.physics.add.overlap(this.player, bb, ()=> { // enter facing left
            this.player.setX(424); this.player.setY(454);
            this.sound.play('teleport');
        }, null, this);

        this.physics.add.overlap(this.player, bw, ()=> {
            this.player.setX(49); this.player.setY(600);
            this.sound.play('teleport');
        }, null, this);
    }

    update() {
    }
}