class SucessScene extends Phaser.Scene {
    constructor(){
        super('SucessScene');
    }


    preload() {
    this.load.image('sucess', 'gameassets/Sucess.png');
    this.load.image('menu', 'gameassets/Voltarmenu.png');
}

    create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.cameras.main.setBackgroundColor('#ffffff')
    this.add.image(0, 0, 'sucess').setOrigin(0, 0).setScale(1.0);
    this.add.image(100, 300, 'menu').setOrigin(0, 0).setScale(1.0).setInteractive( {useHandCursor: true}).on('pointerdown', () => this.scene.start('MenuScene'));
    }


}

export default SucessScene;