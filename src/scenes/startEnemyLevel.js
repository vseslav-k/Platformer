// startEnemyLevel.js 

import LevelBase from './levelBase.js';

export default class StartEnemyLevel extends LevelBase {
  constructor(){ super('StartEnemyLevel'); }
  create(){
    this.add.rectangle(0,0,this.scale.width,this.scale.height,0x2a3b7a).setOrigin(0); // Changed this
    this.add.text(16,16,'Enemy Level',{fontSize:20,color:'#ff0000ff'});
    this.buildWorld('level1'); // keep this; if it crashes, you'll at least see the text first
  }
}
