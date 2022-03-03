import Phaser from 'phaser'

import TitleScreen from './scenes/TitleScreen'

import Game from './scenes/game'

const config = {
    //take a bunch of game configs from https://newdocs.phaser.io/docs/3.52.0/Phaser.Types.Core.GameConfig
    width: 800, //minimal config for game, creates a simple Phase window
    height: 500,
    type: Phaser.AUTO, //let's Phaser determine whether we use Canvas or WebGL, if device is capable, uses WebGL, otherwise uses Canvas, WebGL: 3D, Canvas: 2D\
    backgroundColor: '#616161', //google color picker for color to hex conversion
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 } //no gravity, have option for gravity in x and y direction
        }
    }

}

const game = new Phaser.Game(config) //create game instance

game.scene.add('titlescreen', TitleScreen) //TitleScreen keyed to string 'titlescreen'
game.scene.add('game', Game)

//game.scene.start('titlescreen')
game.scene.start('game')