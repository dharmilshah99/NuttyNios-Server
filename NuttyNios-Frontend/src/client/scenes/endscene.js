import Phaser from 'phaser'
import * as Colyseus from 'colyseus.js'

export default class GameOver extends Phaser.Scene
{
    constructor()
    {
        super({ key: 'gameover' });
    }
    
	init()
	{

	}

	preload()
	{

	}

	create()
	{
		
		const title = this.add.text(400, 200, 'GAME OVER!', {
			fontSize: 38
		})
		title.setOrigin(0.5, 0.5)

        this.add.text(400, 300, 'Press SPACE for New Game', {
		})
		.setOrigin(0.5)

        this.input.keyboard.once('keydown-SPACE', () => {
			this.game.room.send("restart", 1)
		})
    }
}
