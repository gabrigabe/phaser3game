class SucessScene extends Phaser.Scene {
    constructor(){
        super('SucessScene');
    }


    preload() {
    this.load.image('sucess', 'gameassets/Sucess.png');
    this.load.image('menu', 'gameassets/Voltarmenu.png');
    this.load.image('bg', 'gameassets/bg.png');
    this.load.audio('sucess', "gameassets/Sucess.wav");
}

    create() {
    this.sfxSucess = this.sound.add('sucess')
    this.sfxSucess.play();
    this.cursors = this.input.keyboard.createCursorKeys();
    this.add.image(0, 0, 'bg').setOrigin(0, 0).setScale(1.0);
    this.add.image(-100, 0, 'sucess').setOrigin(0, 0).setScale(1.25);
    this.add.image(40, 400, 'menu').setOrigin(0, 0).setScale(1.25).setInteractive( {useHandCursor: true}).on('pointerdown', () => this.scene.start('MenuScene'));
    }


}

export default SucessScene;