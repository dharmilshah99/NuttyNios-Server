import Phaser from 'phaser'
import WebFontFile from '../utils/WebFontFile';
import * as Colyseus from 'colyseus.js'
import trophy from '../characters/Trophy.png'

export default class GameOver extends Phaser.Scene {
	constructor() {
		super({ key: 'gameover' });
	}

	refreshFrameTimer = Phaser.Time.TimerEvent;
	refreshFrameTimer2 = Phaser.Time.TimerEvent;
	refreshFrameInterval = 800;
	refreshFrameInterval2 = 815;

	init() {

	}

	preload() {
		this.load.image('trophy', trophy)
	}

	create() {
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


		this.triangle14 = this.add.triangle(400, 250, 0, 150, 90, 0, 180, 150, 0x0380fc, 1)
			.setScale(12.2)
			.setOrigin(0.5, 0.5)

		this.triangle13 = this.add.triangle(400, 250, 0, 150, 90, 0, 180, 150, 0xff1dce, 1)
			.setScale(11.4)
			.setOrigin(0.5, 0.5)

		this.triangle12 = this.add.triangle(400, 250, 0, 150, 90, 0, 180, 150, 0x0380fc, 1)
			.setScale(10.6)
			.setOrigin(0.5, 0.5)

		this.triangle11 = this.add.triangle(400, 250, 0, 150, 90, 0, 180, 150, 0xfff86e, 1)
			.setScale(9.8)
			.setOrigin(0.5, 0.5)

		this.triangle10 = this.add.triangle(400, 250, 0, 150, 90, 0, 180, 150, 0xff1dce, 1)
			.setScale(9)
			.setOrigin(0.5, 0.5)

		this.triangle9 = this.add.triangle(400, 250, 0, 150, 90, 0, 180, 150, 0x0380fc, 1)
			.setScale(8.2)
			.setOrigin(0.5, 0.5)

		this.triangle8 = this.add.triangle(400, 250, 0, 150, 90, 0, 180, 150, 0xfff86e, 1)
			.setScale(7.4)
			.setOrigin(0.5, 0.5)

		this.triangle7 = this.add.triangle(400, 250, 0, 150, 90, 0, 180, 150, 0xff1dce, 1)
			.setScale(6.6)
			.setOrigin(0.5, 0.5)

		this.triangle6 = this.add.triangle(400, 250, 0, 150, 90, 0, 180, 150, 0x0380fc, 1)
			.setScale(5.8)
			.setOrigin(0.5, 0.5)

		this.triangle5 = this.add.triangle(400, 250, 0, 150, 90, 0, 180, 150, 0xfff86e, 1)
			.setScale(5)
			.setOrigin(0.5, 0.5)

		this.triangle4 = this.add.triangle(400, 250, 0, 150, 90, 0, 180, 150, 0xff1dce, 1)
			.setScale(4.2)
			.setOrigin(0.5, 0.5)

		this.triangle3 = this.add.triangle(400, 250, 0, 150, 90, 0, 180, 150, 0x0380fc, 1)
			.setScale(3.4)
			.setOrigin(0.5, 0.5)

		this.triangle2 = this.add.triangle(400, 250, 0, 150, 90, 0, 180, 150, 0xfff86e, 1)
			.setScale(2.6)
			.setOrigin(0.5, 0.5)

		this.triangle1 = this.add.triangle(400, 250, 0, 150, 90, 0, 180, 150, 0xff1dce, 1)
			.setScale(1.8)
			.setOrigin(0.5, 0.5)

		this.triangle = this.add.triangle(400, 250, 0, 150, 90, 0, 180, 150, 0x0380fc, 1)
			.setScale(1)
			.setOrigin(0.5, 0.5)

		this.leaderboard = this.add.rectangle(400, 250, 500, 270, 0x000000, 1)
			.setOrigin(0.5, 0.5)

		const leaderboardStyle = {
			fontSize: 15,
			fontFamily: ' "Press Start 2P" ',
			color: "#000000"
		}

		this.position = this.add.rectangle(222, 144, 130, 45, 0xffffff, 1)
			.setOrigin(0.5, 0.5)

		this.position1 = this.add.rectangle(222, 197, 130, 45, 0xffffff, 1)
			.setOrigin(0.5, 0.5)

		this.position2 = this.add.rectangle(222, 250, 130, 45, 0xffffff, 1)
			.setOrigin(0.5, 0.5)

		this.position3 = this.add.rectangle(222, 303, 130, 45, 0xffffff, 1)
			.setOrigin(0.5, 0.5)

		this.position4 = this.add.rectangle(222, 356, 130, 45, 0xffffff, 1)
			.setOrigin(0.5, 0.5)

		this.positionlabel = this.add.text(222, 144, "Position", leaderboardStyle)
			.setOrigin(0.5, 0.5)

		this.positionlabel1 = this.add.text(222, 197, "1", leaderboardStyle)
			.setOrigin(0.5, 0.5)

		this.positionlabel2 = this.add.text(222, 250, "2", leaderboardStyle)
			.setOrigin(0.5, 0.5)

		this.positionlabel3 = this.add.text(222, 303, "3", leaderboardStyle)
			.setOrigin(0.5, 0.5)

		this.positionlabel4 = this.add.text(222, 356, "4", leaderboardStyle)
			.setOrigin(0.5, 0.5)

		this.playerName = this.add.rectangle(415, 144, 240, 45, 0xffffff, 1)
			.setOrigin(0.5, 0.5)

		this.playerName1 = this.add.rectangle(415, 197, 240, 45, 0xffffff, 1)
			.setOrigin(0.5, 0.5)

		this.playerName2 = this.add.rectangle(415, 250, 240, 45, 0xffffff, 1)
			.setOrigin(0.5, 0.5)

		this.playerName2 = this.add.rectangle(415, 303, 240, 45, 0xffffff, 1)
			.setOrigin(0.5, 0.5)

		this.playerName2 = this.add.rectangle(415, 356, 240, 45, 0xffffff, 1)
			.setOrigin(0.5, 0.5)

		this.playernamelabel = this.add.text(415, 144, "Player Name", leaderboardStyle)
			.setOrigin(0.5, 0.5)

		this.score = this.add.rectangle(593, 144, 100, 45, 0xffffff, 1)
			.setOrigin(0.5, 0.5)

		this.score1 = this.add.rectangle(593, 197, 100, 45, 0xffffff, 1)
			.setOrigin(0.5, 0.5)

		this.score2 = this.add.rectangle(593, 250, 100, 45, 0xffffff, 1)
			.setOrigin(0.5, 0.5)

		this.score3 = this.add.rectangle(593, 303, 100, 45, 0xffffff, 1)
			.setOrigin(0.5, 0.5)

		this.score3 = this.add.rectangle(593, 356, 100, 45, 0xffffff, 1)
			.setOrigin(0.5, 0.5)

		this.socrelabel = this.add.text(593, 144, "Score", leaderboardStyle)
			.setOrigin(0.5, 0.5)

		const title = this.add.text(400, 63, 'GAME OVER', {
			fontSize: 50,
			fontFamily: ' "Press Start 2P" ',
			color: "#000000"
		})
		title.setOrigin(0.5, 0.5)

		this.gametitle = this.add.text(400, 420, 'TILT TILT', {
			fontSize: 40,
			fontFamily: ' "Press Start 2P" ',
			color: "#000000"
		})
			.setOrigin(0.5, 0.5)

		this.startInstruction = this.add.text(400, 470, 'PRESS SPACE FOR NEW GAME', {
			fontSize: 20,
			fontFamily: ' "Press Start 2P" ',
			color: "#ffffff"
		})
			.setOrigin(0.5, 0.5)

		this.input.keyboard.once('keydown-SPACE', () => {
			this.game.room.send("restart", 1)
		})

		const trophy = this.add.image(75, 250, 'trophy')
			.setOrigin(0.5, 0.5)
			.setScale(0.6)

		const trophy2 = this.add.image(725, 250, 'trophy')
			.setOrigin(0.5, 0.5)
			.setScale(0.6)

	}

	TimerEvent() {
		this.startInstruction.setPosition(-1000, -1000)
	}

	TimerEvent2() {
		this.startInstruction.setPosition(400, 470)
	}
}
