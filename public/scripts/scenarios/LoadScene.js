class LoadScene extends Phaser.Scene{
    constructor(){
        super('LoadScene')
    }

    preload(){
        this.load.spritesheet('player', 'gameassets/herochar_spritesheet.png', {frameWidth:15.8, frameHeight:16})
        this.load.image('tileset2', 'gameassets/tileset.png');
        this.coins = this.load.spritesheet("coins", "gameassets/coins.png", {frameWidth:16, frameHeight:16});
    }

    create() {

        this.anims.create({
            key: 'girar',
            frames: this.anims.generateFrameNumbers('coins', { start: 0, end: 14 }),
            repeat: -1,
            frameRate: 10
        });
        
        this.anims.create({
            key: 'andar',
            frames: this.anims.generateFrameNumbers('player', { start: 8, end: 13 }),
            frameRate: 10
        });

        this.anims.create({
            key: 'pular',
            frames: this.anims.generateFrameNumbers('player', { start: 56, end: 57 }),
            frameRate: 10
        });


        this.anims.create({
            key: 'parado',
            frames: this.anims.generateFrameNumbers('player', { start: 40, end: 43 }),
            frameRate: 3
        });

        this.anims.create({
            key: 'atacar',
            frames: this.anims.generateFrameNumbers('player',{frames: [32, 34, 36]}),
            frameRate: 5
        });


        

    this.add.text(20, 20, "Loading game...");
    this.scene.start('PlayScene');
    }

}

export default LoadScene;