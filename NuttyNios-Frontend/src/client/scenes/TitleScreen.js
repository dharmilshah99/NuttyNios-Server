import Phaser from 'phaser'
import * as Colyseus from 'colyseus.js'
import WebSocketHandler from '../utils/websockethandler';
import WebFontFile from '../utils/WebFontFile';
import frog from '../characters/Frog.png'
import mummy from '../characters/Mummy.png'
import ogre from '../characters/Ogre.png'
import wizard from '../characters/wizard.png'

export default class TitleScreen extends Phaser.Scene
{
    refreshFrameTimer = Phaser.Time.TimerEvent;
    refreshFrameTimer2 = Phaser.Time.TimerEvent;
    refreshFrameInterval = 800;
    refreshFrameInterval2 = 815;


	init()
	{
		this.host = window.location.hostname
		this.client = new Colyseus.Client('ws://' + this.host +':25670');
	}

	preload()
	{
		const fonts = new WebFontFile(this.load, 'Press Start 2P')
		this.load.addFile(fonts)

		this.load.image('frog', frog)
		this.load.image('mummy', mummy)
		this.load.image('ogre', ogre)
		this.load.image('wizard',wizard)
	}

	async create()
	{
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

		const room = await this.client.joinOrCreate("my_room");
		console.log(room.sessionId);

		// boiler plate code for receving message from server. TODO: remove if not needed
		// room.onMessage("direction", (message) => {
		// 	console.log("message received from server");
		// 	console.log(message);
		//   });

		this.backgroundelement4 = this.add.circle(400,500,700,0x0380fc,1)
			.setOrigin(0.5,0.5)
		this.backgroundelement3 = this.add.circle(400,500,600,0xfff86e,1)
			.setOrigin(0.5,0.5)
		this.backgroundelement2 = this.add.circle(400,500,500,0xff1dce,1)
			.setOrigin(0.5,0.5)
		this.backgroundelement4 = this.add.circle(400,500,400,0x0380fc,1)
			.setOrigin(0.5,0.5)
		this.backgroundelement3 = this.add.circle(400,500,300,0xfff86e,1)
			.setOrigin(0.5,0.5)
		this.backgroundelement2 = this.add.circle(400,500,200,0xff1dce,1)
			.setOrigin(0.5,0.5)
		this.backgroundelement1 = this.add.circle(400,500,100,0x0380fc,1)
			.setOrigin(0.5,0.5)

		this.button1frame = this.add.ellipse(103,370,193,90,0xffffff,1)
			.setOrigin(0.5,0.5)
		this.button1 = this.add.ellipse(103,370,173,70,0x000000,1)
			.setOrigin(0.5,0.5)

		this.button2frame = this.add.ellipse(301,370,193,90,0xffffff,1)
			.setOrigin(0.5,0.5)
		this.button2 = this.add.ellipse(301,370,173,70,0x000000,1)
			.setOrigin(0.5,0.5)

		this.button3frame = this.add.ellipse(499,370,193,90,0xffffff,1)
			.setOrigin(0.5,0.5)
		this.button3 = this.add.ellipse(499,370,173,70,0x000000,1)
			.setOrigin(0.5,0.5)
		
		this.button4frame = this.add.ellipse(697,370,193,90,0xffffff,1)
			.setOrigin(0.5,0.5)
		this.button4 = this.add.ellipse(697,370,173,70,0x000000,1)
			.setOrigin(0.5,0.5)

		const title = this.add.text(400, 75, 'TILT TILT', {
			fontSize: 48,
			fontFamily: ' "Press Start 2P" '
		})
		title.setOrigin(0.5, 0.5)

		const subtitle = this.add.text(400, 150, '- A Nutty Nios Game -',{
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

		const frog = this.add.image(103,250,'frog')
			.setOrigin(0.5,0.5)
			.setScale(2)

		const mummy = this.add.image(301,250,'mummy')
			.setOrigin(0.5,0.5)
			.setScale(2)

		const ogre = this.add.image(499,250,'ogre')
			.setOrigin(0.5,0.5)
			.setScale(1.15)

		const wizard = this.add.image(697,250,'wizard')
			.setOrigin(0.5,0.5)
			.setScale(1.2)


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

	TimerEvent()
	{
		this.startInstruction.setPosition(-1000,-1000)
	}

	TimerEvent2()
	{
		this.startInstruction.setPosition(400,480)
	}
}
