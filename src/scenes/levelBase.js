// levelBase.js
// Helper level scene template to build the tile map

import Knight from '../objects/knight.js';

export default class LevelBase extends Phaser.Scene {
    constructor(key) { 
        super(key); 
    }

    buildWorld(mapKey) {
        const map = this.make.tilemap({ key: mapKey });

        // Tilesets (match the Tileset NAMES in Tiled)
        const tsWorld = map.addTilesetImage('world_tileset', 'world_tileset');

        // Detect optional 'platforms' tileset without ternary
        // Changed this
        let tsPlatforms = null;
        const hasPlatforms = map.tilesets.find(t => t.name === 'platforms');
        if (hasPlatforms) {
            tsPlatforms = map.addTilesetImage('platforms', 'platforms');
        }

        // Build the tileset array without ternary
        // Changed this
        const tilesets = [];
        tilesets.push(tsWorld);
        if (tsPlatforms) {
            tilesets.push(tsPlatforms);
        }

        // Create layers only if they exist (no ternaries)
        // Changed this
        let ground = null;
        if (map.getLayerIndex('Ground') >= 0) {
            ground = map.createLayer('Ground', tilesets, 0, 0);
        }

        // Changed this
        let platforms = null;
        if (map.getLayerIndex('Platforms') >= 0) {
            platforms = map.createLayer('Platforms', tilesets, 0, 0);
        }

        // Optional decorative layer
        // Changed this
        let deco = null;
        if (map.getLayerIndex('Deco') >= 0) {
            deco = map.createLayer('Deco', tilesets, 0, 0);
        }

        // Collisions for any tile with property collides: true
        if (ground) ground.setCollisionByProperty({ collides: true });
        if (platforms) platforms.setCollisionByProperty({ collides: true });

        // Player
        this.player = new Knight(this, 64, 64);

        // Colliders
        if (ground) this.physics.add.collider(this.player, ground);
        if (platforms) this.physics.add.collider(this.player, platforms);

        // Camera & world bounds
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.12, 0.12);

        // Optional end area via object layer "Goal"
        const goalLayer = map.getObjectLayer('Goal');
        if (goalLayer) {
            const goal = this.physics.add.staticGroup();
            goalLayer.objects.forEach(obj => {
                const gx = obj.x + obj.width / 2;
                const gy = obj.y - obj.height / 2;
                const g = goal.create(gx, gy);
                g.setSize(obj.width, obj.height).setVisible(false);
            });
            this.physics.add.overlap(this.player, goal, () => this.endLevel(), null, this);
        }
    }

    endLevel() {
        this.scene.start('Start');
    }

    update() {
        if (this.player) this.player.update();
    }
}
