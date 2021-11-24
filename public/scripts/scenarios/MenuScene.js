

class MenuScene extends Phaser.Scene {
    constructor(){
        super('MenuScene');
    }


    preload() {
    this.load.image('logo', 'gameassets/logo.png');
    this.load.image('play', 'gameassets/playbutton.png');
}

    create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.cameras.main.setBackgroundColor('#FFFFFF')
    this.add.image(0, 0, 'logo').setOrigin(0, 0).setScale(1.0);
    this.add.image(0, 0, 'play').setOrigin(-0.15, -8).setScale(1.0).setInteractive( {useHandCursor: true}).on('pointerdown', () => this.scene.start('LoadScene'));
    }


}

export default MenuScene;