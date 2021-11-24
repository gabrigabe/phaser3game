import MenuScene from './scenarios/MenuScene.js';
import LoadScene from './scenarios/LoadScene.js';
import PlayScene from './scenarios/PlayScene.js';
import UIScene from './scenarios/UiScene.js';
import HelpScene from './scenarios/HelpScene.js';
import GameOverScene from './scenarios/GameOverScene.js';
import SucessScene from './scenarios/SucessScene.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    autoCenter: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { 
                y: 300 },
            
            fps:60},
    
        

    },

    scene:[MenuScene,LoadScene, PlayScene]
};



const game = new Phaser.Game(config);
game.scene.add('MenuScene');
game.scene.add('LoadScene');
game.scene.add('PlayScene');
game.scene.add('UIScene', UIScene, false)
game.scene.add('GameOverScene', GameOverScene);
game.scene.add('HelpScene', HelpScene);
game.scene.add('SucessScene', SucessScene);