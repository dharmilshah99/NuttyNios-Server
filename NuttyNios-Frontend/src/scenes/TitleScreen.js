import Phaser from 'phaser'

export default class TitleScreen extends Phaser.Scene
{
	preload(){

	}
	create()
	{
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
