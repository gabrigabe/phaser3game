class UIScene extends Phaser.Scene{
    constructor(){
        super({key: 'UIScene', active: false});
    }

preload(){
    
}
create(){
        this.moedas = 0;
        this.tesouros = 0;
        this.vidas = 3;

        let infoMoedas = this.add.text(10, 10, `Moedas: ${this.moedas}`, { font: '32px Segoe UI', fill: '#ffffff', stroke:'#f000000', strokeThickness: 6 });
        let infoTesouros = this.add.text(10, 50, `Tesouros: ${this.tesouros}/3`, { font: '32px Segoe UI', fill: '#ffffff', stroke:'#f000000', strokeThickness: 6 });
        let infoVidas = this.add.text(10, 90, `Vidas: ${this.vidas}`, { font: '32px Segoe UI', fill: '#ffffff', stroke:'#f000000', strokeThickness: 6 }  )

        let game = this.scene.get('PlayScene');

        game.events.on('addCoins', function () {

            this.moedas += 1

            infoMoedas.setText(`Moedas: ${this.moedas}`)



        }, this);

        game.events.on('addTreasure', function () {

            this.tesouros += 1

            infoTesouros.setText(`Tesouros: ${this.tesouros}/3`)



        }, this);

        game.events.on('removeLife', function () {

            this.vidas -= 1

            infoVidas.setText(`Vidas: ${this.vidas}`)



        }, this);
        game.events.on('GameOver', function () {

            this.scene.setVisible(false);




        }, this);

        game.events.on('GameStart', function () {

            this.scene.setVisible(true)
            game.events.off('addCoins')
            game.events.off('addTreasure')
            game.events.off('removeLife')




        }, this);
}

}

export default UIScene;