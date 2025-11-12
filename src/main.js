// main.js

import Start from './scenes/start.js';
import StartEnemyLevel from './scenes/startEnemyLevel.js';
import StartPortalLevel from './scenes/startPortalLevel.js';

const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 800,
  backgroundColor: '#1a6cabff', // sky blue-ish
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1500 },
      debug: true // set as true for now
    }
  },
  pixelArt: true, // should this be true or false idk
  scene: [Start, StartEnemyLevel, StartPortalLevel]
};

new Phaser.Game(config);
