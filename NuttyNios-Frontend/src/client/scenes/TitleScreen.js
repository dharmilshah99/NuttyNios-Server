import Phaser from 'phaser'
import * as Colyseus from 'colyseus.js'
import WebSocketHandler from '../utils/websockethandler';
import WebFontFile from '../utils/WebFontFile';
import frog from '../characters/Frog.png'
import mummy from '../characters/Mummy.png'
import ogre from '../characters/Ogre.png'
import wizard from '../characters/wizard.png'
import greenbutton from '../characters/GreenButton.png'
import redbutton from '../characters/RedButton.png'
import autoBind from 'auto-bind';

export default class TitleScreen extends Phaser.Scene {
	refreshFrameTimer = Phaser.Time.TimerEvent;
	refreshFrameTimer2 = Phaser.Time.TimerEvent;
	refreshFrameInterval = 800;
	refreshFrameInterval2 = 815;

	constructor() {
		super({ key: 'titlescreen' });
		autoBind(this)
	}

	init() {
		this.host = window.location.hostname
		this.client = new Colyseus.Client('ws://' + this.host + ':25670');
	}

	preload() {
		const fonts = new WebFontFile(this.load, 'Press Start 2P')
		this.load.addFile(fonts)

		this.load.image('frog', frog)
		this.load.image('mummy', mummy)
		this.load.image('ogre', ogre)
		this.load.image('wizard', wizard)
		this.load.image('greenbutton', greenbutton)
		this.load.image('redbutton', redbutton)

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

	async create() {
		this.refreshFrameTimer = this.time.addEvent({
			callback: this.TimerEvent,
			callbackScope: this,
			delay: this.refreshFrameInterval,
			loop: true
		})

		this.refreshFrameTimer2 = this.time.addEvent({
			callback: this.TimerEvent2,
			callbackScope: this,
			delay: this.refreshFrameInterval2,
			loop: true
		})

		/* ============= UI ============ */
		this.backgroundelement4 = this.add.circle(400, 500, 700, 0x0380fc, 1)
			.setOrigin(0.5, 0.5)
		this.backgroundelement3 = this.add.circle(400, 500, 600, 0xfff86e, 1)
			.setOrigin(0.5, 0.5)
		this.backgroundelement2 = this.add.circle(400, 500, 500, 0xff1dce, 1)
			.setOrigin(0.5, 0.5)
		this.backgroundelement4 = this.add.circle(400, 500, 400, 0x0380fc, 1)
			.setOrigin(0.5, 0.5)
		this.backgroundelement3 = this.add.circle(400, 500, 300, 0xfff86e, 1)
			.setOrigin(0.5, 0.5)
		this.backgroundelement2 = this.add.circle(400, 500, 200, 0xff1dce, 1)
			.setOrigin(0.5, 0.5)
		this.backgroundelement1 = this.add.circle(400, 500, 100, 0x0380fc, 1)
			.setOrigin(0.5, 0.5)

		this.button1frame = this.add.ellipse(103, 370, 193, 90, 0xffffff, 1)
			.setOrigin(0.5, 0.5)
		this.button1 = this.add.ellipse(103, 370, 173, 70, 0x000000, 1)
			.setOrigin(0.5, 0.5)

		this.button2frame = this.add.ellipse(301, 370, 193, 90, 0xffffff, 1)
			.setOrigin(0.5, 0.5)
		this.button2 = this.add.ellipse(301, 370, 173, 70, 0x000000, 1)
			.setOrigin(0.5, 0.5)

		this.button3frame = this.add.ellipse(499, 370, 193, 90, 0xffffff, 1)
			.setOrigin(0.5, 0.5)
		this.button3 = this.add.ellipse(499, 370, 173, 70, 0x000000, 1)
			.setOrigin(0.5, 0.5)

		this.button4frame = this.add.ellipse(697, 370, 193, 90, 0xffffff, 1)
			.setOrigin(0.5, 0.5)
		this.button4 = this.add.ellipse(697, 370, 173, 70, 0x000000, 1)
			.setOrigin(0.5, 0.5)

		const title = this.add.text(400, 75, 'TILT TILT', {
			fontSize: 48,
			fontFamily: ' "Press Start 2P" '
		})
		title.setOrigin(0.5, 0.5)
		const subtitle = this.add.text(400, 150, '- A Nutty Nios Game -', {
			fontSize: 25,
			fontFamily: ' "Press Start 2P" '
		})
		subtitle.setOrigin(0.5, 0.5)


		this.add.text(103, 362, 'PRESS 1 FOR', {
			fontSize: 12,
			fontFamily: ' "Press Start 2P" '
		})
			.setOrigin(0.5, 0.5)

		this.add.text(103, 380, 'PLAYER 1', {
			fontSize: 12,
			fontFamily: ' "Press Start 2P" '
		})
			.setOrigin(0.5, 0.5)

		this.add.text(301, 362, 'PRESS 2 FOR', {
			fontSize: 12,
			fontFamily: ' "Press Start 2P" '
		})
			.setOrigin(0.5)

		this.add.text(301, 380, 'PLAYER 2', {
			fontSize: 12,
			fontFamily: ' "Press Start 2P" '
		})
			.setOrigin(0.5)

		this.add.text(499, 362, 'PRESS 3 FOR', {
			fontSize: 12,
			fontFamily: ' "Press Start 2P" '
		})
			.setOrigin(0.5)

		this.add.text(499, 380, 'PLAYER 3', {
			fontSize: 12,
			fontFamily: ' "Press Start 2P" '
		})
			.setOrigin(0.5)

		this.add.text(697, 362, 'PRESS 4 FOR', {
			fontSize: 12,
			fontFamily: ' "Press Start 2P" '
		})
			.setOrigin(0.5)

		this.add.text(697, 380, 'PLAYER 4', {
			fontSize: 12,
			fontFamily: ' "Press Start 2P" '
		})
			.setOrigin(0.5)

		this.startInstruction = this.add.text(400, 480, 'PRESS SPACE TO START', {
			fontFamily: ' "Press Start 2P" ',
			fontSize: 19
		})
			.setOrigin(0.5)

		const frog = this.add.image(103, 250, 'frog')
			.setOrigin(0.5, 0.5)
			.setScale(2)

		const mummy = this.add.image(301, 250, 'mummy')
			.setOrigin(0.5, 0.5)
			.setScale(2)

		const ogre = this.add.image(499, 250, 'ogre')
			.setOrigin(0.5, 0.5)
			.setScale(1.15)

		const wizard = this.add.image(697, 250, 'wizard')
			.setOrigin(0.5, 0.5)
			.setScale(1.2)

		const greenbutton = this.add.image(103, 80, 'greenbutton')
			.setOrigin(0.5, 0.5)
			.setScale(0.45, 0.27)

		const _redbutton = this.add.image(697, 80, 'redbutton')
			.setOrigin(0.5)
			.setScale(0.45, 0.27)

		this.modeinstruction = this.add.text(103, 77, 'PRESS E FOR', {
			fontFamily: '  "Press Start 2P" ',
			fontSize: 10
		})
			.setOrigin(0.5)

		this.modeinstruction1 = this.add.text(103, 93, 'EASY MODE', {
			fontFamily: '  "Press Start 2P" ',
			fontSize: 10
		})
			.setOrigin(0.5)

		this.modeinstruction2 = this.add.text(702, 75, 'PRESS H FOR', {
			fontFamily: '  "Press Start 2P" ',
			fontSize: 10
		})
			.setOrigin(0.5)

		this.modeinstruction3 = this.add.text(702, 91, 'HARD MODE', {
			fontFamily: '  "Press Start 2P" ',
			fontSize: 10
		})
			.setOrigin(0.5)

		/* ============= Server Sync Helpers ============ */
		// Create synchronised room sessiom
		this.game.room = await this.client.joinOrCreate("my_room");
		// console.log(this.game.room.sessionId);
		this.uiSceneRunning = "titlescreen"

		// State change handler
		this.game.room.onStateChange((newState) => {
			this.game.playerScores = newState.playerScores
			this.game.timeLeft = newState.timeLeft
			this.game.playerRank = newState.playerRank

			console.log("Player 1: " + this.game.playerScores.get("1"))
			console.log("Player 2: " + this.game.playerScores.get("2"))
			console.log("Player 3: " + this.game.playerScores.get("3"))
			console.log("Player 4: " + this.game.playerScores.get("4"))

			console.log("Rank 1: " + this.game.playerRank.get("1"))
			console.log("Rank 2: " + this.game.playerRank.get("2"))
			console.log("Rank 3: " + this.game.playerRank.get("3"))
			console.log("Rank 4: " + this.game.playerRank.get("4"))

		});

		// Message handlers
		this.game.room.onMessage("start-game", (message) => {
			console.log("starting game scene")
			this.sleepPreviousParallelScene("game")
		});

		this.game.room.onMessage("end-game", (message) => {
			console.log("starting gameover scene")
			this.sleepPreviousParallelScene("gameover")
		});

		this.game.room.onMessage("new-game", (message) => {
			console.log("starting titlescreen scene")
			this.game.room.leave()
			this.sleepPreviousParallelScene("titlescreen")
		});

		this.game.room.onMessage("direction-input", (message) => {
			console.log("direction received from server: " + message)
			this.game.directionInput = message
			// this.sleepPreviousParallelScene("titlescreen")
		});

	
		/* ============= Keyboard Input ============ */

		this.input.keyboard.addListener('keydown-ONE', () => {
			// console.log("1 is pressed")
			this.playerSetUp(1)
		})

		this.input.keyboard.addListener('keydown-TWO', () => {
			// console.log("2 is pressed")
			this.playerSetUp(2)
		})

		this.input.keyboard.addListener('keydown-THREE', () => {
			// console.log("3 is pressed")
			this.playerSetUp(3)
		})

		this.input.keyboard.addListener('keydown-FOUR', () => {
			// console.log("4 is pressed")
			this.playerSetUp(4)
		})

		this.input.keyboard.addListener('keydown-SPACE', () => {
			this.game.room.send("start-attempt", 1)
		})

		this.input.keyboard.addListener('keydown-E', () => {
			this.game.room.send("difficulty", "0")
			console.log("easy selected")
		})

		this.input.keyboard.addListener('keydown-H', () => {
			this.game.room.send("difficulty", "1")
			console.log("hard selected")
		})
	}

	playerSetUp(playerNum) {
		this.nodeNum = (playerNum - 1).toString()
		this.game.playerNum = playerNum.toString()
		// this.game["direction"] = new WebSocketHandler("19000", this.nodeNum, "direction")
		this.game.room.send("playerIdent", this.game.playerNum)

		this.game.room.send("ready", this.game.playerNum)
	}

	update() {
		this.input.keyboard.once('keydown-ONE', () => {
			this.revertStatusColor()
			this.button1frame.fillColor = 0x32a850
		})

		this.input.keyboard.once('keydown-TWO', () => {
			this.revertStatusColor()
			this.button2frame.fillColor = 0x32a850
		})

		this.input.keyboard.once('keydown-THREE', () => {
			this.revertStatusColor()
			this.button3frame.fillColor = 0x32a850
		})

		this.input.keyboard.once('keydown-FOUR', () => {
			this.revertStatusColor()
			this.button4frame.fillColor = 0x32a850
		})

	}

	revertStatusColor() {
		this.button1frame.fillColor = 0xffffff
		this.button2frame.fillColor = 0xffffff
		this.button3frame.fillColor = 0xffffff
		this.button4frame.fillColor = 0xffffff
	}

	TimerEvent() {
		this.startInstruction.setPosition(-1000, -1000)
	}

	TimerEvent2() {
		this.startInstruction.setPosition(400, 480)
	}
}
