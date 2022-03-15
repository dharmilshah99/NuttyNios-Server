import Phaser from 'phaser'
import * as Colyseus from 'colyseus.js'
import WebSocketHandler from '../utils/websockethandler';

export default class TitleScreen extends Phaser.Scene
{
	init()
	{
		this.host = window.location.hostname
		this.client = new Colyseus.Client('ws://' + this.host +':25670');
	}

	preload()
	{
		
	}

	async create()
	{
		const room = await this.client.joinOrCreate("my_room");
		console.log(room.sessionId);

		// boiler plate code for receving message from server. TODO: remove if not needed
		// room.onMessage("direction", (message) => {
		// 	console.log("message received from server");
		// 	console.log(message);
		//   });
		
		const title = this.add.text(400, 200, 'Multiplayer Tilt Tilt!', {
			fontSize: 38
		})
		title.setOrigin(0.5, 0.5)
		
		
		this.add.text(400, 300, 'Press 1 for Player 1', {
		})
		.setOrigin(0.5)

		this.add.text(400, 325, 'Press 2 for Player 2', {
		})
		.setOrigin(0.5)

		this.add.text(400, 350, 'Press 3 for Player 3', {
		})
		.setOrigin(0.5)

		this.add.text(400, 375, 'Press 4 for Player 4', {
		})
		.setOrigin(0.5)
		
		this.add.text(400, 450, 'Press Space to Start', {
		})
		.setOrigin(0.5)

		this.input.keyboard.once('keydown-ONE', () => {
			console.log("1 is pressed")
			this.nodeNum = "0"
			this.game["direction"] = new WebSocketHandler("18000", this.nodeNum, "direction")
			this.game["buttons"] = new WebSocketHandler("18000", this.nodeNum, "button")
			this.game["switches"] = new WebSocketHandler("18000", this.nodeNum, "switch")
		})

		this.input.keyboard.once('keydown-TWO', () => {
			console.log("2 is pressed")
			this.nodeNum = "1"
			this.game["direction"] = new WebSocketHandler("18001", this.nodeNum, "direction")
			this.game["buttons"] = new WebSocketHandler("18001", this.nodeNum, "button")
			this.game["switches"] = new WebSocketHandler("18001", this.nodeNum, "switch")
		})

		this.input.keyboard.once('keydown-THREE', () => {
			console.log("3 is pressed")
			this.nodeNum = "2"
			this.game["direction"] = new WebSocketHandler("18002", this.nodeNum, "direction")
			this.game["buttons"] = new WebSocketHandler("18002", this.nodeNum, "button")
			this.game["switches"] = new WebSocketHandler("18002", this.nodeNum, "switch")
		})

		this.input.keyboard.once('keydown-FOUR', () => {
			console.log("4 is pressed")
			this.nodeNum = "3"
			this.game["direction"] = new WebSocketHandler("18003", this.nodeNum, "direction")
			this.game["buttons"] = new WebSocketHandler("18003", this.nodeNum, "button")
			this.game["switches"] = new WebSocketHandler("18003", this.nodeNum, "switch")
		})
		
		this.input.keyboard.once('keydown-SPACE', () => {
			this.scene.start('game')
		})
	}
}
