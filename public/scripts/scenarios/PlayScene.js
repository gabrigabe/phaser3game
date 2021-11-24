let coinLayer;
let tesourosLayer;
let coins;
let tesouros;
let vidas = 3;
let tesourosEncontrados = 0;
let playerDyng = 0;


class PlayScene extends Phaser.Scene {
    constructor(){
        super('PlayScene');
    }
     preload(){
        this.gameOver = false;
        playerDyng = 0
        tesourosEncontrados = 0;
        this.load.tilemapTiledJSON('mapa', 'gameassets/newmap.json')
        this.load.scenePlugin({
            key:'AnimatedTiles',
            url:'https://raw.githubusercontent.com/nkholski/phaser-animated-tiles/master/dist/AnimatedTiles.js',
            sceneKey:'animatedTiles',
            systemKey:'animatedTiles'
        });

     }


     create() {
        vidas = 3
        this.scene.run('UIScene');
        this.events.emit('GameStart');
        this.sfxCoin = this.sound.add('coin')
        this.sfxDeath = this.sound.add('morte')
        this.sfxJump = this.sound.add('pulo')
        this.sfxHit = this.sound.add('hitted')
        this.sfxTreasure = this.sound.add('treasure')
        const mapa = this.add.tilemap('mapa');
        const tileset = mapa.addTilesetImage('tileset', 'tileset2');
        const fundo = mapa.createLayer('fundo', tileset, 0,0);
        const solidos = mapa.createLayer('terrain', tileset, 0, 0);
        const deadlys = mapa.createLayer('machuca', tileset, 0, 0);
        coinLayer = mapa.getObjectLayer('moedas')['objects'];
        tesourosLayer = mapa.getObjectLayer('tesouro')['objects'];
        coins = this.physics.add.staticGroup();
        tesouros = this.physics.add.staticGroup();
        this.sys.animatedTiles.init(mapa);
        deadlys.setCollisionByProperty({deadly: true})
        fundo.setCollisionByProperty({solido: true})
        solidos.setCollisionByProperty({solido: true})
        this.cameras.main.setBounds(0,0,mapa.widthInPixels, mapa.heightInPixels)
        this.physics.world.setBounds( 0, 0, mapa.widthInPixels, mapa.heightInPixels);
        this.cameras.main.setZoom(2)
        this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.z = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z)
        this.player = this.physics.add.sprite(this.game.config.width / 10, this.game.config.height / 3, 'player').setScale(1.5, 1.5);
        this.physics.add.collider(this.player, solidos)
        this.physics.add.collider(this.player, fundo)
        this.physics.add.collider(this.player, deadlys, hitDeadly, null, this);
        this.physics.add.overlap(this.player, coins, collectCoin, null, this);
        this.physics.add.overlap(this.player, tesouros, collectTreasure, null, this);

        this.teste = this.cameras.main.startFollow(this.player)


        coinLayer.forEach(object => {
            this.obj = coins.create(object.x, object.y, 'coins');
            this.obj.anims.play('girar',15, true)
              this.obj.setScale(object.width/16, object.height/16); 
               this.obj.setOrigin(0); 
               this.obj.body.width = object.width; 
               this. obj.body.height = object.height; 
        });

        tesourosLayer.forEach(object => {
            this.tesouro = tesouros.create(object.x, object.y, 'tesouro');
              this.tesouro.setScale(object.width/32, object.height/32); 
               this.tesouro.setOrigin(0); 
               this.tesouro.body.width = object.width; 
               this. tesouro.body.height = object.height; 

        });


        function collectCoin(player, coin) {
            this.sfxCoin.play();
            coin.destroy(coin.x, coin.y); 
            this.events.emit('addCoins')
        }

        function collectTreasure(player, tesouros) {
            this.sfxTreasure.play();
            tesouros.destroy(tesouros.x, tesouros.y); 
            tesourosEncontrados = tesourosEncontrados + 1; 
            this.events.emit('addTreasure')

            if(tesourosEncontrados === 3 ){
                this.events.emit('GameOver');
                this.scene.start('SucessScene');
            }

        }



        function hitDeadly (player, deadlys)
        {   
            let x = player.x - 120;
            let y = player.y - 100;

           vidas = vidas - 1;
           playerDyng = 1;
           this.events.emit('removeLife')

           if(vidas >= 0 && vidas < 3){
            player.anims.play('hit', true)
            player.once('animationcomplete', () => {
                playerDyng = 0

            })
            if(player.flipX){
                player.x = player.x + 100
            }else if(!player.flipX){
                player.x = player.x - 100
            }
            this.sfxHit.play();
           }

           if(vidas === -1){
            player.anims.play('death', true)
            playerDyng = 1;
            player.disableBody();
            this.gameOver= true;

            player.once('animationcomplete', () => {
                this.events.emit('GameOver');
                this.scene.start('GameOverScene')

        
              })
           }
        }

    }
    
     update() {

    
        if(!Phaser.Geom.Rectangle.Overlaps(this.physics.world.bounds, this.player.getBounds())){
            let x = this.player.x - 120;
            let y = this.player.y - 100;
            playerDyng = 1;
            vidas = vidas - 1;
 
            if(vidas >= 0 && vidas < 3){
            playerDyng = 0
            this.player.anims.play('hit', true)
            this.events.emit('removeLife')
             if(this.player.flipX){
                this.player.y =  this.player.y - 150
                this.player.x =  this.player.x + 100

             }else if(!this.player.flipX){
                this.player.y =  this.player.y - 150
                this.player.x =  this.player.x - 100

             }

             this.sfxHit.play();
            }
            else if(vidas  === -1){
                this.events.emit('GameOver');
                this.scene.start('GameOverScene')

            }
        }

        if(!this.gameOver){
            this.player.body.setVelocityX(0);
            if(this.a.isDown ){
                this.player.body.setVelocityX(-45)
                this.player.flipX = true
            }
            if(this.d.isDown){
                this.player.body.setVelocityX(45)
                this.player.flipX = false
            }
            if(this.w.isDown && this.player.body.onFloor()){
                this.player.body.setVelocityY(-250)
               this.sfxJump.play();
            }
    
            if((this.a.isDown || this.d.isDown) && this.player.body.onFloor() ){
                this.player.anims.play('andar',true);
            }else if(this.w.isDown){
                this.player.anims.play('pular', true);
            }else if(this.z.isDown){
                this.player.anims.play('atacar', true);
            }else if(playerDyng === 0){
                this.player.anims.play('parado', true)
    
            }

        }



    }
    

        
    }

export default PlayScene;
