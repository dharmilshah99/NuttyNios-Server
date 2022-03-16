import Phaser from 'phaser'
import WebFontFile from '../utils/WebFontFile';
import frog from '../characters/Frog.png'
import mummy from '../characters/Mummy.png'
import ogre from '../characters/Ogre.png'
import wizard from '../characters/wizard.png'
import nut from '../characters/Nut.png'
import hourglass from '../characters/Hourglass.png'
import * as Colyseus from 'colyseus.js'

class Game extends Phaser.Scene
{
    constructor()
    {
        super({ key: 'game' });
    }
    refreshFrameTimer = Phaser.Time.TimerEvent;
    refreshFrameTimer2 = Phaser.Time.TimerEvent;
    refreshFrameInterval = 1000;
    refreshFrameInterval2 = 10000;
    
    init(data)
    {
        this.Score = 0
        this.NuttyMode = 0
    }

    preload()
    {
        this.load.image('frog', frog)
		this.load.image('mummy', mummy)
		this.load.image('ogre', ogre)
		this.load.image('wizard',wizard)
        this.load.image('nut',nut)
        this.load.image('hourglass',hourglass)
    }

    create()
    {
        // create timer
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

        this.backgroundElement = this.add.rectangle(400,250, 1000, 1000, 0xfff86e, 1)
        this.backgroundElement.setAngle(45)

        this.backgroundElement1 = this.add.rectangle(400,250, 850, 850, 0xff1dce, 1)
        this.backgroundElement1.setAngle(45)

        this.backgroundElement2 = this.add.rectangle(400,250, 700, 700, 0x0380fc, 1)
        this.backgroundElement2.setAngle(45)

        this.backgroundElement3 = this.add.rectangle(400,250, 550, 550, 0xfff86e, 1)
        this.backgroundElement3.setAngle(45)

        this.backgroundElement4 = this.add.rectangle(400,250, 400, 400, 0xff1dce, 1)
        this.backgroundElement4.setAngle(45)

        this.backgroundElement5 = this.add.rectangle(400,250, 250, 250, 0x0380fc, 1)
        this.backgroundElement5.setAngle(45)

        this.arrowUpOutline = this.add.polygon(400, 150, '40 0 40 20 100 20 100 80 40 80 40 100 0 50', 0xffffff, 1)
        this.arrowUpOutline.setAngle(90)

        this.arrowUp = this.add.polygon(400, 145, '32 0 32 16 80 16 80 64 32 64 32 80 0 40', 0x4d4a4a, 1)
        this.arrowUp.setAngle(90)

        this.arrowDownOutline = this.add.polygon(400, 350, '40 0 40 20 100 20 100 80 40 80 40 100 0 50', 0xffffff, 1)
        this.arrowDownOutline.setAngle(270)

        this.arrowDown = this.add.polygon(400, 355, '32 0 32 16 80 16 80 64 32 64 32 80 0 40', 0x4d4a4a, 1)
        this.arrowDown.setAngle(270)

        this.arrowLeftOutline = this.add.polygon(300, 250, '40 0 40 20 100 20 100 80 40 80 40 100 0 50', 0xffffff, 1)

        this.arrowLeft = this.add.polygon(295, 250, '32 0 32 16 80 16 80 64 32 64 32 80 0 40', 0x4d4a4a, 1)


        this.arrowRightOutline = this.add.polygon(500, 250, '40 0 40 20 100 20 100 80 40 80 40 100 0 50', 0xffffff, 1)
        this.arrowRightOutline.setAngle(180)

        this.arrowRight = this.add.polygon(505, 250, '32 0 32 16 80 16 80 64 32 64 32 80 0 40', 0x4d4a4a, 1)
        this.arrowRight.setAngle(180)

        this.indicator = this.add.circle(400, 250, 35, 0xffffff, 1)
        
        const scoreStyle = {
            fontSize: 30,
            fontFamily: ' "Press Start 2P" ',
        }

        const nuttyStyle = {
            fontSize: 30,
            fontFamily: ' "Press Start 2P" ',
            color: "#000000"
        }

        const titleStyle = {
            fontSize: 60,
            fontFamily: ' "Press Start 2P" ',
            color: '#ffffff'
        }

        const playerlabelStyle = {
            fontSize: 16,
            fontFamily: ' "Press Start 2P" '
        }

        this.player1labelframe = this.add.rectangle(685,400,185,75,0xffffff,1)
            .setOrigin(0.5,0.5)
        this.player1label = this.add.rectangle(685,400,162,55,0x000000,1)
            .setOrigin(0.5,0.5)
        this.player1 = this.add.text(656,392,'Player', playerlabelStyle)
            .setOrigin(0.5,0.5)
        this.player1Num = this.add.text(656,412,'1', playerlabelStyle)
            .setOrigin(0.5,0.5)

        this.scoreboardframe1 = this.add.circle(750,400, 45, 0xffffff, 1)
            .setOrigin(0.5, 0.5)
        this.scoreboard1 = this.add.circle(750, 400, 35, 0x000000, 1)
            .setOrigin(0.5, 0.5)
        this.ScoreLabel1 = this.add.text(753, 403, '0', scoreStyle)
            .setOrigin(0.5, 0.5)

        this.player2labelframe = this.add.rectangle(685,100,185,75,0xffffff,1)
            .setOrigin(0.5,0.5)
        this.player2label = this.add.rectangle(685,100,162,55,0x000000,1)
            .setOrigin(0.5,0.5)
        this.player2 = this.add.text(656,88,'Player', playerlabelStyle)
            .setOrigin(0.5,0.5)
        this.player2Num = this.add.text(656,108,'2', playerlabelStyle)
            .setOrigin(0.5,0.5)

        this.scoreboardframe2 = this.add.circle(750,100, 45, 0xffffff, 1)
            .setOrigin(0.5, 0.5)
        this.scoreboard2 = this.add.circle(750, 100, 35, 0x000000, 1)
            .setOrigin(0.5, 0.5)
        this.ScoreLabel2 = this.add.text(753, 103, '0', scoreStyle)
            .setOrigin(0.5, 0.5)

        this.player3labelframe = this.add.rectangle(115,100,185,75,0xffffff,1)
            .setOrigin(0.5,0.5)
        this.player3label = this.add.rectangle(115,100,162,55,0x000000,1)
            .setOrigin(0.5,0.5)
        this.player3 = this.add.text(144,88,'Player', playerlabelStyle)
            .setOrigin(0.5,0.5)
        this.player3Num = this.add.text(144,108,'3', playerlabelStyle)
            .setOrigin(0.5,0.5)

        this.scoreboardframe3 = this.add.circle(50,100, 45, 0xffffff, 1)
            .setOrigin(0.5, 0.5)
        this.scoreboard3 = this.add.circle(50, 100, 35, 0x000000, 1)
            .setOrigin(0.5, 0.5)
        this.ScoreLabel3 = this.add.text(47, 103, '0', scoreStyle)
            .setOrigin(0.5, 0.5)

        this.player4labelframe = this.add.rectangle(115,400,185,75,0xffffff,1)
            .setOrigin(0.5,0.5)
        this.player4label = this.add.rectangle(115,400,162,55,0x000000,1)
            .setOrigin(0.5,0.5)
        this.player4 = this.add.text(144,392,'Player', playerlabelStyle)
            .setOrigin(0.5,0.5)
        this.player4Num = this.add.text(144,412,'4', playerlabelStyle)
            .setOrigin(0.5,0.5)

        this.scoreboardframe4 = this.add.circle(50,400, 45, 0xffffff, 1)
            .setOrigin(0.5, 0.5)
        this.scoreboard4 = this.add.circle(50, 400, 35, 0x000000, 1)
            .setOrigin(0.5, 0.5)
        this.ScoreLabel4 = this.add.text(47, 403, '0', scoreStyle)
            .setOrigin(0.5, 0.5)

        this.TitleLabel1 = this.add.text(520, 365, 'TILT', titleStyle)
            .setOrigin(0.5, 0.5)
            .setAngle(-45)
        this.TitleLabel2 = this.add.text(280, 365, 'TILT', titleStyle)
            .setOrigin(0.5, 0.5)
            .setAngle(45)

        const frog = this.add.image(755,330,'frog')
			.setOrigin(0.5,0.5)
			.setScale(1.05)
            .setAngle(-5)

		const mummy = this.add.image(755,33,'mummy')
			.setOrigin(0.5,0.5)
			.setScale(0.88)

		const ogre = this.add.image(55,31,'ogre')
			.setOrigin(0.5,0.5)
			.setScale(0.50)

		const wizard = this.add.image(45,322,'wizard')
			.setOrigin(0.5,0.5)
			.setScale(0.65)

        this.nut = this.add.image(395,250, 'nut')
            .setOrigin(0.5,0.5)
            .setScale(0.31)

            
        this.timerframe = this.add.rectangle(400,52,220,80,0x000000,1)
        this.timer = this.add.rectangle(400,52,200,60,0xffffff,1)
        this.timerframe2 = this.add.rectangle(353,52,10,80,0x000000,1)

        this.hourglass = this.add.image(325,52,'hourglass')
            .setOrigin(0.5,0.5)
            .setScale(0.13)

        this.second = this.add.text(470,50, 's',nuttyStyle)

        this.NuttyModeLabel = this.add.text(400, 475, 'NUTTY MODE ON!', nuttyStyle)
            .setOrigin(0.5, 0.5)
        

        this.cursors = this.input.keyboard.createCursorKeys() // can access cursor keys, space bar and shift
    }

    // by default phaser updates 60 frames / second
    update()
    {
        /* Update based on info from server */

        this.updateScores()
        this.second.text = this.game.timeLeft

        /* Use for deployment on server, read from nios */
        // this.MessageHandler()
        // console.log(this.directionInput)
        // this.checkNuttyMode()
        
        // if(this.NuttyMode == 0)
        // {   
        //     this.NuttyModeLabel.setPosition(-10000, -10000)
        //     if(this.Score == this.Currentscore){
        //         this.checkMQTTKeyboardInput()         
        //     }
        // }
        // else if(this.NuttyMode == 1)
        // {   
        //     this.NuttyModeLabel.setPosition(400, 450)
        //     if(this.Score == this.Currentscore){
        //         this.checkMQTTNuttyKeyboardInput()     
        //     }
        // }   

        /* Use for local testing, keyboard inputs */
        this.checkNuttyMode()
        
        if(this.NuttyMode == 0)
        {   
            this.NuttyModeLabel.setPosition(-10000, -10000)
            this.nut.setPosition(-1000,-1000)
            if(this.Score == this.Currentscore){
                this.checkKeyboardInput()         
            }
        }
        else if(this.NuttyMode == 1)
        {   
            this.NuttyModeLabel.setPosition(400, 475)
            this.nut.setPosition(395,250)
            if(this.Score == this.Currentscore){
                this.checkNuttyKeyboardInput()     
            }
        }

        // print out time left in game to console
        console.log(this.game.timeLeft)
    }
    
    // handles all incoming messages from websockets
    MessageHandler()
    {
        // reset state of input
        this.directionInput = {}
        this.directionInput['up'] = false
        this.directionInput['left'] = false
        this.directionInput['right'] = false
        this.directionInput['down'] = false

        // update inputs
        this.directionInputList = this.game["direction"].getMessage().directions_moved
        if(this.directionInputList !== undefined){
            for(let i = 0; i < this.directionInputList.length; i++){
                switch(this.directionInputList[i]) {
                    case 0:
                        this.directionInput.down = true
                      break;
                    case 1:
                        break;
                        this.directionInput.up = true
                    case 2:
                        this.directionInput.left = true
                    break;
                    case 3:
                        this.directionInput.right = true
                    break;
                  }
            }
        }
        // TODO: uncomment the following once messages are published to both topics
        // this.buttonsInput = this.game["buttons"].getMessage().buttons
        // this.switchesInput = this.game["switches"].getMessage().switches
    }

    // update scoreboard of every player
    updateScores()
    {
        this.ScoreLabel1.text = this.game.playerScores.get("1")
        this.ScoreLabel2.text = this.game.playerScores.get("2")
        this.ScoreLabel3.text = this.game.playerScores.get("3")
        this.ScoreLabel4.text = this.game.playerScores.get("4")
    }

    // this function is called every refreshFrameInterval
    TimerEvent()
    {
        // gets a new frame
        this.Currentscore = this.Score
        this.dir = Phaser.Math.Between(1,4)
        this.revertarrowColor()
        this.setArrowColor()
    }

    TimerEvent2()
    {
        this.revertNuttyMode()
    }

    setArrowColor()
    {
        if(this.dir==1){
            this.arrowUp.fillColor = 0xff0000 + Phaser.Math.Between(1000, 50000)
        }
        else if(this.dir==2){
            this.arrowDown.fillColor = 0xff0000 + Phaser.Math.Between(1000, 50000)
        }
        else if(this.dir==3){
            this.arrowLeft.fillColor = 0xff0000 + Phaser.Math.Between(1000, 50000)
        }
        else if(this.dir==4){
            this.arrowRight.fillColor = 0xff0000 + Phaser.Math.Between(1000, 50000)
        }
    }

    incrementScore()
    {
        this.Score += 1
        this.game.room.send("score", 1)
    }

    revertarrowColor()
    {
        this.arrowUp.fillColor = 0xffffff
        this.arrowDown.fillColor = 0xffffff
        this.arrowLeft.fillColor = 0xffffff
        this.arrowRight.fillColor = 0xffffff
    }

    checkNuttyMode()
    {
        // TODO: change to input from this.buttonsInput
        this.input.keyboard.once('keydown-SHIFT', () => {
			this.NuttyMode = !this.NuttyMode
		})
    }

    revertNuttyMode()
    {
        this.NuttyMode = 0
    }

    checkMQTTKeyboardInput()
    {
        if(this.directionInput.up && this.dir == 1){
            this.incrementScore()
        }
        if(this.directionInput.down && this.dir == 2){
            this.incrementScore()
        }
        if(this.directionInput.left && this.dir == 3){
            this.incrementScore()
        }
        if(this.directionInput.right && this.dir == 4){
            this.incrementScore()
        }
    }

    checkMQTTNuttyKeyboardInput()
    {
        if(this.directionInput.up && this.dir == 2){
            this.incrementScore()
        }
        if(this.directionInput.down && this.dir == 1){
            this.incrementScore()
        }
        if(this.directionInput.left && this.dir == 4){
            this.incrementScore()
        }
        if(this.directionInput.right && this.dir == 3){
            this.incrementScore()
        }
    }

    checkKeyboardInput()
    {
        if(this.cursors.up.isDown && this.dir == 1){
            this.incrementScore()
        }
        else if(this.cursors.down.isDown && this.dir == 2){
            this.incrementScore()
        }
        else if(this.cursors.left.isDown && this.dir == 3){
            this.incrementScore()
        }
        else if(this.cursors.right.isDown && this.dir == 4){
            this.incrementScore()
        }
    }

    checkNuttyKeyboardInput()
    {
        if(this.cursors.up.isDown && this.dir == 2){
            this.incrementScore()
        }
        else if(this.cursors.down.isDown && this.dir == 1){
            this.incrementScore()
        }
        else if(this.cursors.left.isDown && this.dir == 4){
            this.incrementScore()
        }
        else if(this.cursors.right.isDown && this.dir == 3){
            this.incrementScore()
        }
    }
}

export default Game
