
import MenuScene from './scenarios/MenuScene.js';
import PlayScene from './scenarios/PlayScene.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    autoCenter: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 5000 }
        }
    },
    scene:[MenuScene, PlayScene]

};



const game = new Phaser.Game(config);
game.scene.add('MenuScene');
game.scene.add('PlayScene');