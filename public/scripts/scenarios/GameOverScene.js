class GameOverScene extends Phaser.Scene {
    constructor(){
        super('GameOverScene');
    }


    preload() {
    this.load.image('logoGameOver', 'gameassets/GameOver.png');
    this.load.image('menu', 'gameassets/Voltarmenu.png');
}

    create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.cameras.main.setBackgroundColor('#ffffff')
    this.add.image(0, 0, 'logoGameOver').setOrigin(0, 0).setScale(1.0);
    this.add.image(100, 400, 'menu').setOrigin(0, 0).setScale(1.0).setInteractive( {useHandCursor: true}).on('pointerdown', () => this.scene.start('MenuScene'));
    }


}

export default GameOverScene;