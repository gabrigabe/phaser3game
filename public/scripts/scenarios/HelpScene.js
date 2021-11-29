class HelpScene extends Phaser.Scene {
    constructor(){
        super('HelpScene');
    }


    preload() {
    this.load.image('bg', 'gameassets/bg.png');
    this.load.image('ajuda', 'gameassets/textoajuda.png');
    this.load.image('menu', 'gameassets/Voltarmenu.png');
}

    create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.add.image(0, 0, 'bg').setOrigin(0, 0).setScale(1.0);
    this.add.image(0, 50, 'ajuda').setOrigin(0, 0).setScale(1.0);
    this.add.image(40, 400, 'menu').setOrigin(0, 0).setScale(1.25).setInteractive( {useHandCursor: true}).on('pointerdown', () => this.scene.start('MenuScene'));
    }


}

export default HelpScene;