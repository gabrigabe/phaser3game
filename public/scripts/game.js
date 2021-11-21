import MenuScene from './scenarios/MenuScene.js';
import LoadScene from './scenarios/LoadScene.js';
import PlayScene from './scenarios/PlayScene.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    autoCenter: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { 
                y: 300 }},
        

    },

    scene:[MenuScene,LoadScene, PlayScene]

};



const game = new Phaser.Game(config);
game.scene.add('MenuScene');
game.scene.add('LoadScene');
game.scene.add('PlayScene');