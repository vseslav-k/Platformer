import LevelBase from './levelBase.js';
import Knight from '../objects/knight.js';
import Ladder from '../objects/ladder.js';
import Coin from '../objects/coin.js';
import Finish from '../objects/finish.js';
export default class StartEnemyLevel extends Phaser.Scene {
  constructor(){ super('StartEnemyLevel'); }

  preload() {
  }

  create() {
        this.player = new Knight(this, 64, 700);
        this.timeTaken = 0;
        this.coinCount = 0;
        const map = this.make.tilemap({ key: "StartEnemyLevel" });
        const tileset = map.addTilesetImage("world_tileset", "world_tileset");


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
        
        this.updatables = [];
        this.instantiateGameObjectsFromLayer(map);


       

    }
    endGame(){
      this.add.text(16,8,"You won!",{fontSize:20,color:'#ffffffff'});
      this.add.text(16,30,`You gathered ${this.player.coinCount} / ${this.coinCount} coins!`,{fontSize:20,color:'#ffffffff'});
      this.add.text(16,52,`You died ${this.player.deathsCount} times!`,{fontSize:20,color:'#ffffffff'});
      this.add.text(16,74,`Time taken: ${(this.timeTaken / 1000).toFixed(2)} seconds`,{fontSize:20,color:'#ffffffff'});
      this.time.delayedCall(5000, () => {
        this.scene.start('Start');
      }, [], this);
    }

    serializeObjectProperties(propertiesArray){
      if(!propertiesArray) return {};
      console.log(propertiesArray);
      const properties = {};
      for(let prop of propertiesArray){
        properties[prop.name] = prop.value;
      }
      return properties;
    }

    instantiateGameObjectsFromLayer(map){
       const objects = map.getObjectLayer("gameObjects").objects;

       for(let obj of objects){

        let properties = this.serializeObjectProperties(obj.properties);
     
        console.log(properties);
         switch(properties['type']){
           case "ladder":
              console.log("ladder");
              this.updatables.push(new Ladder(obj.x, obj.y, properties["len"], properties["width"], this.player));
              break;
            case "coin":
              console.log("coin");
              new Coin(this, this.player, obj.x, obj.y);
              this.coinCount++;
              break;
            case "finish":
              console.log("finish");
              this.updatables.push(new Finish(this, this.player, obj.x, obj.y, properties["len"], properties["width"]));
              break;
         }
     }
   }

    update(time, delta) {
      this.updatables.forEach(updatable => updatable.update());
      this.timeTaken += delta;
        
    }
  
}
