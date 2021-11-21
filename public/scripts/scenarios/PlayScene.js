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
     }


     create() {
        let coinLayer;
        let coins;
        let coinScore = 1;
        let text;
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
        this.physics.world.setBounds( 0, 0, mapa.widthInPixels, mapa.heightInPixels + 100);
        this.cameras.main.setZoom(2.0)
        this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.z = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z)
        this.player = this.physics.add.sprite(this.game.config.width / 10, this.game.config.height / 3, 'player').setScale(1.5, 1.5);
        this.physics.add.collider(this.player, solidos)
        this.physics.add.collider(this.player, fundo)
        this.physics.add.collider(this.player, deadlys, hitDeadly, null, this);
        this.physics.add.overlap(this.player, coins, collectCoin, null, this);

        this.cameras.main.startFollow(this.player)

        coinLayer.forEach(object => {
            this.obj = coins.create(object.x, object.y, 'coins');
            this.obj.anims.play('girar',15, true)
              this.obj.setScale(object.width/16, object.height/16); 
               this.obj.setOrigin(0); 
               this.obj.body.width = object.width; 
               this. obj.body.height = object.height; 
        });

        function collectCoin(player, coin) {
            coin.destroy(coin.x, coin.y); 
            coinScore = coinScore ++; 
            return false;
        }


        function hitDeadly (player, deadlys)
        {
    
            player.body.enable = false
            this.scene.start('MenuScene');
        }




    }
    
     update() {
        this.physics.world.setFPS(30);
        this.player.body.setVelocityX(0);

    

        
        if(!Phaser.Geom.Rectangle.Overlaps(this.physics.world.bounds, this.player.getBounds())){
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
        


      /*  let cursors = this.input.keyboard.createCursorKeys();
        if ((cursors.left.isDown || this.a.isDown) || (cursors.right.isDown || this.d.isDown)) this.player.setVelocityX(cursors.left.isDown || this.a.isDown ? -160 : 160);
        else this.player.setVelocityX(0);
        if ((cursors.up.isDown || this.w.isDown)) this.player.setVelocityY(cursors.up.isDown || this.w.isDown ? -100 : 100);
        else this.player.setVelocityY(0);*/
    }
    

        
    }

export default PlayScene;
