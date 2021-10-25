
class PlayScene extends Phaser.Scene {
    constructor(){
        super('PlayScene');
    }

    
     create() {

        const mapa = this.add.tilemap('mapa');
        const tileset = mapa.addTilesetImage('tileset', 'tileset2');
        const solidos = mapa.createDynamicLayer('tilecamada1', tileset, 0, 0);
        solidos.setCollisionByProperty({solido: true})
        this.cameras.main.setBounds(0,0, mapa.widthInPixels, mapa.heightInPixels)
        this.cameras.main.setZoom(2.0)

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


        this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.z = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z)
        this.player = this.physics.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'player').setScale(1.6, 1.6);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, solidos)
        this.cameras.main.startFollow(this.player)
    }
    
     update() {
        this.player.body.setVelocityX(0);

        if(this.a.isDown){
            this.player.body.setVelocityX(-50)
            this.player.flipX = true
        }
        if(this.d.isDown){
            this.player.body.setVelocityX(50)
            this.player.flipX = false
        }
        if(this.w.isDown && this.player.body.onFloor()){
            this.player.body.setVelocityY(-300)
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
