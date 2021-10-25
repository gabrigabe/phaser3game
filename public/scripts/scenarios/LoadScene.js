class LoadScene extends Phaser.Scene{
    constructor(){
        super('LoadScene')
    }

    preload(){
        this.load.spritesheet('player', 'gameassets/herochar_spritesheet.png', {frameWidth:15.8, frameHeight:16})
        this.load.image('tileset2', 'gameassets/tileset.png');
        this.load.tilemapTiledJSON('mapa', 'gameassets/map.json')
    }

    create() {
    this.add.text(20, 20, "Loading game...");
    this.scene.start('PlayScene');
    }

}

export default LoadScene;