

class MenuScene extends Phaser.Scene {
    constructor(){
        super('MenuScene');
    }


    preload() {
    this.load.image('logo', 'gameassets/logo.png');
    this.load.image('play', 'gameassets/playbutton.png');
    this.load.image('help', 'gameassets/helpbutton.png');
    this.load.image('bg', 'gameassets/bg.png');
}

    create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.add.image(0, 0, 'bg').setOrigin(0, 0).setScale(1.0);
    this.add.image(0, 50, 'logo').setOrigin(0, 0).setScale(1.0);
    this.add.image(300, 350, 'play').setOrigin(0, 0).setScale(1.0).setInteractive( {useHandCursor: true}).on('pointerdown', () => this.scene.start('LoadScene'));
    this.add.image(300, 450, 'help').setOrigin(0, 0).setScale(1.0).setInteractive( {useHandCursor: true}).on('pointerdown', () => this.scene.start('HelpScene'));
    }


}

export default MenuScene;