
class PlayScene extends Phaser.Scene {
    constructor(){
        super('PlayScene');
    }

    preload() {
        
        this.load.image('player', 'img/scithersword.png');
    
    }
    
     create() {
        this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    
        this.player = this.physics.add.image(50, 50, 'player').setScale(0.5, 0.5);
        this.player.setCollideWorldBounds(true);
    }
    
     update() {
        let cursors = this.input.keyboard.createCursorKeys();
        if ((cursors.left.isDown || this.a.isDown) || (cursors.right.isDown || this.d.isDown)) this.player.setVelocityX(cursors.left.isDown || this.a.isDown ? -160 : 160);
        else this.player.setVelocityX(0);
        if ((cursors.up.isDown || this.w.isDown) || (cursors.down.isDown || this.s.isDown)) this.player.setVelocityY(cursors.up.isDown || this.w.isDown ? -160 : 160);
        else this.player.setVelocityY(0);
    }
    

        
    }

export default PlayScene;
