// start.js
// Starts off as a menu to choose between the two levels:
// - enemy level (Vee's level)
// - portal level (Kevin's level)

export default class Start extends Phaser.Scene {
    constructor() { super('Start'); }

    preload() {
        // TILE SETS
        this.load.tilemapTiledJSON('StartEnemyLevel', 'assets/maps/lvlVee.tmj');
        
        this.load.image('world_tileset', 'assets/sprites/world_tileset.png');
        this.load.image('platforms', 'assets/sprites/platforms.png'); 
        this.load.image('dust', 'assets/sprites/dust.png'); 

        // PLAYER
        this.load.spritesheet('knight', 'assets/sprites/knight.png', {
            frameWidth: 32, frameHeight: 32
        });
        this.load.spritesheet('coin', 'assets/sprites/coin.png', {
            frameWidth: 16, frameHeight: 16
        });
        this.load.spritesheet('slash', 'assets/sprites/slash.png', {
            frameWidth: 64, frameHeight: 47
        });
        this.load.image('slime', 'assets/sprites/slimeSingle.png'); 

        // SOUNDS (deal with later) 
        
        this.load.audio('coin', 'assets/sounds/coin.wav');
        this.load.audio('explosion', 'assets/sounds/explosion.wav');
        this.load.audio('hurt', 'assets/sounds/hurt.wav');
        this.load.audio('jump', 'assets/sounds/jump.wav'); 
        this.load.audio('attack', 'assets/sounds/attack.mp3');
        this.load.audio('slimeDeath', 'assets/sounds/slimeDeath.wav');
        this.load.audio('power_up', 'assets/sounds/power_up.wav');

        // ENEMIES

        // PORTALS

    }

    create() {
        this.add.text(480, 200, 'Select level',
        { fontSize: 24, color: '#fff' }).setOrigin(0.5);

        this.add.text(480, 260, '[1] Enemy Level (Vee)\n[2] Portal Level (Kevin)',
        { fontSize: 18, color: '#b5e8ff', align: 'center' }).setOrigin(0.5);

        this.input.keyboard.on('keydown-ONE', () => this.scene.start('StartEnemyLevel'));
        this.input.keyboard.on('keydown-TWO', () => this.scene.start('StartPortalLevel'));
    }
}