export default class finish{
    constructor(scene, player, x, y, len, width) {
        this.scene = scene;
        this.player = player;
        this.x = x;
        this.y = y;
        this.len = len;
        this.width = width;
    }


    endGame(){
        console.log("You win!");
        this.scene.endGame();
    }

    update(){
        if(Math.abs(this.player.x - this.x) < this.width/2 && Math.abs(this.player.y - this.y) < this.len/2){
            this.endGame();
        }
    }
}