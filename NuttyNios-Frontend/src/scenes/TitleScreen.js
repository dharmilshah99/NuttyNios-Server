import Phaser from 'phaser'

export default class TitleScreen extends Phaser.Scene //use Modern JavaScript to create clasess
{   //every scene has preload and create method
    preload(){

    }

    create(){
        const text = this.add.text(400, 250, 'Hello, World!')  //(x-pos, y-pos, text)
        text.setOrigin(0.5, 0.5) //origin of text set to middle (range from 0-1), so that it is centred in window
    }
}
