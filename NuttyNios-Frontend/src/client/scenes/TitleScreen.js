import Phaser from 'phaser'
import * as Colyseus from 'colyseus.js'
import WebSocketHandler from '../utils/websockethandler';

export default class TitleScreen extends Phaser.Scene
{
	constructor()
    {
        super({ key: 'titlescreen' });
    }

	init()
	{
		this.host = window.location.hostname
		this.client = new Colyseus.Client('ws://' + this.host +':25670');
	}

	preload()
	{

	}

	sleepPreviousParallelScene(sceneToStart) {
		if (this.uiSceneRunning !== sceneToStart) {
			if (this.uiSceneRunning !== "") {
				this.scene.get(this.uiSceneRunning).scene.sleep();
			}
			const newScene = this.scene.get(sceneToStart);
			newScene.scene.start();
			this.scene.bringToTop(sceneToStart);
			this.uiSceneRunning = sceneToStart;
	
			return newScene;
		} else {
			return this.scene.get(this.uiSceneRunning);
		}
	}

	async create()
	{
		// Create synchronised room sessiom
		this.game.room = await this.client.joinOrCreate("my_room");
		console.log(this.game.room.sessionId);
		this.uiSceneRunning = "titlescreen"
		// State change handler
		this.game.room.onStateChange((newState) => {
			this.game.playerScores = newState.playerScores
			this.game.timeLeft = newState.timeLeft
			console.log("Player 1: "+this.game.playerScores.get("1"))
			console.log("Player 2: " +this.game.playerScores.get("2"))
			console.log("Player 3: " +this.game.playerScores.get("3"))
			console.log("Player 4: " +this.game.playerScores.get("4"))

		});
		
		// Message handlers
		this.game.room.onMessage("start-game", (message) => {
			this.sleepPreviousParallelScene("game")
		});

		this.game.room.onMessage("end-game", (message) => {
			this.sleepPreviousParallelScene("gameover")
		});

		this.game.room.onMessage("new-game", (message) => {
			this.sleepPreviousParallelScene("titlescreen")
		});


		// UI
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

			this.game.playerNum = "1"
			this.game.room.send("playerIdent", 1)
			this.game.room.send("ready", 1)
		})

		this.input.keyboard.once('keydown-TWO', () => {
			console.log("2 is pressed")
			this.nodeNum = "1"
			this.game["direction"] = new WebSocketHandler("18001", this.nodeNum, "direction")
			this.game["buttons"] = new WebSocketHandler("18001", this.nodeNum, "button")
			this.game["switches"] = new WebSocketHandler("18001", this.nodeNum, "switch")
			
			this.game.playerNum = "2"
			this.game.room.send("playerIdent", 2)
			this.game.room.send("ready", 2)
		})

		this.input.keyboard.once('keydown-THREE', () => {
			console.log("3 is pressed")
			this.nodeNum = "2"
			this.game["direction"] = new WebSocketHandler("18002", this.nodeNum, "direction")
			this.game["buttons"] = new WebSocketHandler("18002", this.nodeNum, "button")
			this.game["switches"] = new WebSocketHandler("18002", this.nodeNum, "switch")

			this.game.playerNum = "3"
			this.game.room.send("playerIdent", 3)
			this.game.room.send("ready", 3)
		})

		this.input.keyboard.once('keydown-FOUR', () => {
			console.log("4 is pressed")
			this.nodeNum = "3"
			this.game["direction"] = new WebSocketHandler("18003", this.nodeNum, "direction")
			this.game["buttons"] = new WebSocketHandler("18003", this.nodeNum, "button")
			this.game["switches"] = new WebSocketHandler("18003", this.nodeNum, "switch")
			
			this.game.playerNum = "4"
			this.game.room.send("playerIdent", 4)
			this.game.room.send("ready", 4)
		})
		
		this.input.keyboard.addListener('keydown-SPACE', () => {
			this.game.room.send("start-attempt", 1)
		})
	}
}
