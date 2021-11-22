let coinLayer;
let coins;
let coinScore = 0;
let text;


class PlayScene extends Phaser.Scene {
    constructor(){
        super('PlayScene');
    }
     preload(){
        this.load.tilemapTiledJSON('mapa', 'gameassets/newmap.json')
        this.load.scenePlugin({
            key:'AnimatedTiles',
            url:'https://raw.githubusercontent.com/nkholski/phaser-animated-tiles/master/dist/AnimatedTiles.js',
            sceneKey:'animatedTiles',
            systemKey:'animatedTiles'
        });


        this.canvas = this.sys.game.canvas;
     }


     create() {
        this.sfxCoin = this.sound.add('coin')
        this.sfxDeath = this.sound.add('morte')
        this.sfxJump = this.sound.add('pulo')
        const mapa = this.add.tilemap('mapa');
        const tileset = mapa.addTilesetImage('tileset', 'tileset2');
        const fundo = mapa.createLayer('fundo', tileset, 0,0);
        const solidos = mapa.createLayer('terrain', tileset, 0, 0);
        const deadlys = mapa.createLayer('machuca', tileset, 0, 0);
        coinLayer = mapa.getObjectLayer('moedas')['objects'];
        coins = this.physics.add.staticGroup()
        this.sys.animatedTiles.init(mapa);
        deadlys.setCollisionByProperty({deadly: true})
        fundo.setCollisionByProperty({solido: true})
        solidos.setCollisionByProperty({solido: true})
        this.cameras.main.setBounds(0,0,mapa.widthInPixels, mapa.heightInPixels)
        this.physics.world.setBounds( 0, 0, mapa.widthInPixels, mapa.heightInPixels);
        this.cameras.main.setZoom(1.8)
        this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.z = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z)
        this.player = this.physics.add.sprite(this.game.config.width / 10, this.game.config.height / 3, 'player').setScale(1.5, 1.5);
        this.physics.add.collider(this.player, solidos)
        this.physics.add.collider(this.player, fundo)
        this.physics.add.collider(this.player, deadlys, hitDeadly, null, this);
        this.physics.add.overlap(this.player, coins, collectCoin, null, this);

        this.teste = this.cameras.main.startFollow(this.player)


        coinLayer.forEach(object => {
            this.obj = coins.create(object.x, object.y, 'coins');
            this.obj.anims.play('girar',15, true)
              this.obj.setScale(object.width/16, object.height/16); 
               this.obj.setOrigin(0); 
               this.obj.body.width = object.width; 
               this. obj.body.height = object.height; 
        });

        text = this.add.text(this.cameras.main.x, this.cameras.main.y,
            `Moedas: ${coinScore}`, {
            fontSize: '20px',
            fill: '#ffffff'
          });

        function collectCoin(player, coin) {
            this.sfxCoin.play();
            coin.destroy(coin.x, coin.y); 
            coinScore = coinScore + 1; 
            text.setText(`Moedas: ${coinScore}`)
            return false;
        }



        function hitDeadly (player, deadlys)
        {
            this.sfxDeath.play()
            coinScore = 0;
            player.anims.play('death')
            player.body.enable = false
            this.scene.start('MenuScene');
        }





    }
    
     update() {
        this.physics.world.setFPS(30);
        this.player.body.setVelocityX(0);
        this.sfxJump = this.sound.add('pulo')

        text.y = this.cameras.main.scrollY + 150
        text.x = this.player.x  + 100

    
        if(!Phaser.Geom.Rectangle.Overlaps(this.physics.world.bounds, this.player.getBounds())){
            this.sfxDeath.play()
            coinScore = 0
            this.gameOver = true;
            this.player.body.enable = false
            this.scene.start('MenuScene')
        }


        if(this.a.isDown){
            this.player.body.setVelocityX(-50)
            this.player.flipX = true
        }
        if(this.d.isDown){
            this.player.body.setVelocityX(50)
            this.player.flipX = false
        }
        if(this.w.isDown && this.player.body.onFloor()){
            this.player.body.setVelocityY(-250)
            this.sfxJump.play();
        }

        if((this.a.isDown || this.d.isDown) && this.player.body.onFloor()){
            this.player.anims.play('andar',true);
        }else if(this.w.isDown){
            this.player.anims.play('pular', true);
        }else if(this.z.isDown){
            this.player.anims.play('atacar', true);
        }
        
        else{
            this.player.anims.play('parado', true)
        }
        

    }
    

        
    }

export default PlayScene;
