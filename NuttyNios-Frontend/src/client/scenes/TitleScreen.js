import Phaser from 'phaser'
import * as Colyseus from 'colyseus.js'

export default class TitleScreen extends Phaser.Scene
{
	init()
	{
		this.host = window.location.hostname
		this.client = new Colyseus.Client('ws://' + this.host +':2567');
	}

	preload()
	{

	}

	async create()
	{
		const room = await this.client.joinOrCreate("my_room");
		console.log(room.sessionId);

		const title = this.add.text(400, 200, 'Multiplayer Tilt Tilt!', {
			fontSize: 38
		})
		title.setOrigin(0.5, 0.5)

		this.add.text(400, 300, 'Press Space to Start', {
		})
		.setOrigin(0.5)

		this.input.keyboard.once('keydown-SPACE', () => {
			this.scene.start('game')
		})
	}
}
