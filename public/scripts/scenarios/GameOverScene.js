class GameOverScene extends Phaser.Scene {
    constructor(){
        super('GameOverScene');
    }


    preload() {
    this.load.image('logoGameOver', 'gameassets/GameOver.png');
    this.load.image('menu', 'gameassets/Voltarmenu.png');
    this.load.image('bg', 'gameassets/bg.png');
    this.load.audio('morte', "gameassets/Death.wav");

}

    create() {
    this.sfxDeath = this.sound.add('morte')
    this.sfxDeath.play();
    this.cursors = this.input.keyboard.createCursorKeys();
    this.add.image(0, 0, 'bg').setOrigin(0, 0).setScale(1.0);
    this.add.image(-100, 0, 'logoGameOver').setOrigin(0, 0).setScale(1.25);
    this.add.image(40, 400, 'menu').setOrigin(0, 0).setScale(1.25).setInteractive( {useHandCursor: true}).on('pointerdown', () => this.scene.start('MenuScene'));
    }


}

export default GameOverScene;