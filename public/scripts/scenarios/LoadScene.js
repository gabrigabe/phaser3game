class LoadScene extends Phaser.Scene{
    constructor(){
        super('LoadScene')
    }

    preload(){
        this.load.spritesheet('player', 'gameassets/herochar_spritesheet.png', {frameWidth:15.8, frameHeight:16});
        this.load.image('tileset2', 'gameassets/tileset.png');
        this.coins = this.load.spritesheet("coins", "gameassets/coins.png", {frameWidth:16, frameHeight:16});
        this.tesouros = this.load.spritesheet("tesouro", "gameassets/spritesheet.png", {frameWidth:30, frameHeight:23, startFrame: 3});
        this.load.audio('pulo', "gameassets/Jump.wav");
        this.load.audio('coin', "gameassets/CoinPick.wav");
        this.load.audio('morte', "gameassets/Death.wav");
        this.load.audio('hitted', "gameassets/hitted.wav");
        this.load.audio('treasure', "gameassets/TreasurePick.wav");
    }

    create() {

        this.anims.create({
            key: 'death',
            frames: this.anims.generateFrameNumbers('player',{start: 64, end : 66}),
            frameRate: 5,
        });

        this.anims.create({
            key: 'hit',
            frames: this.anims.generateFrameNumbers('player',{start: 64, end : 66}),
            frameRate: 5,
        });

        this.anims.create({
            key: 'abrir',
            frames: this.anims.generateFrameNumbers('tesouro',{start: 0, end : 3}),
            frameRate: 1,
        });

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


        

    this.add.text(20, 20, "Loading game...");
    this.scene.start('PlayScene');
    }

}

export default LoadScene;