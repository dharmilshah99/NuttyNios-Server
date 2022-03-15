import Phaser from 'phaser'

class Game extends Phaser.Scene
{
    refreshFrameTimer = Phaser.Time.TimerEvent;
    refreshFrameTimer2 = Phaser.Time.TimerEvent;
    refreshFrameInterval = 4000;
    refreshFrameInterval2 = 10000;
    
    init(data)
    {
        this.Score = 0
        this.NuttyMode = 0
    }

    preload()
    {
         
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

        this.hehe = this.add.rectangle(400,250, 300, 300, 0xff1dce, 1)
        this.hehe.setAngle(45)

        this.hehe1 = this.add.rectangle(400,250, 250, 250, 0x4287f5, 1)
        this.hehe1.setAngle(45)

        this.arrowUpOutline = this.add.polygon(400, 150, '40 0 40 20 100 20 100 80 40 80 40 100 0 50', 0xffffff, 1)
        this.arrowUpOutline.setAngle(90)

        this.arrowUp = this.add.polygon(400, 145, '32 0 32 16 80 16 80 64 32 64 32 80 0 40', 0xb0b0b0, 1)
        this.arrowUp.setAngle(90)

        this.arrowDownOutline = this.add.polygon(400, 350, '40 0 40 20 100 20 100 80 40 80 40 100 0 50', 0xffffff, 1)
        this.arrowDownOutline.setAngle(270)

        this.arrowDown = this.add.polygon(400, 355, '32 0 32 16 80 16 80 64 32 64 32 80 0 40', 0xb0b0b0, 1)
        this.arrowDown.setAngle(270)

        this.arrowLeftOutline = this.add.polygon(300, 250, '40 0 40 20 100 20 100 80 40 80 40 100 0 50', 0xffffff, 1)

        this.arrowLeft = this.add.polygon(295, 250, '32 0 32 16 80 16 80 64 32 64 32 80 0 40', 0xb0b0b0, 1)


        this.arrowRightOutline = this.add.polygon(500, 250, '40 0 40 20 100 20 100 80 40 80 40 100 0 50', 0xffffff, 1)
        this.arrowRightOutline.setAngle(180)

        this.arrowRight = this.add.polygon(505, 250, '32 0 32 16 80 16 80 64 32 64 32 80 0 40', 0xb0b0b0, 1)
        this.arrowRight.setAngle(180)

        this.gameName = this.add.circle(400, 250, 35, 0xffffff, 1)
        
        const scoreStyle = {
            fontSize: 48
        }

        const titleStyle = {
            fontSize: 20
        }

        this.scoreboard1 = this.add.circle(750, 400, 35, 0xff1dce, 1)

        this.ScoreLabel = this.add.text(750, 400, '0', scoreStyle)
            .setOrigin(0.5, 0.5)

        this.TitleLabel1 = this.add.text(400, 240, 'Tilt', titleStyle)
            .setOrigin(0.5, 0.5)
            .setColor(0xff0000)

        this.TitleLabel2 = this.add.text(400, 260, 'Tilt', titleStyle)
            .setOrigin(0.5, 0.5)
            .setColor(0xff0000)

        this.NuttyModeLabel = this.add.text(400, 450, 'NUTTY MODE ON!', scoreStyle)
            .setOrigin(0.5, 0.5)

        this.cursors = this.input.keyboard.createCursorKeys() // can access cursor keys, space bar and shift
    }

    // by default phaser updates 60 frames / second
    update()
    {
<<<<<<< HEAD
        // this.MessageHandler()
        console.log(this.directionInput)
=======
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
>>>>>>> main
        this.checkNuttyMode()
        
        if(this.NuttyMode == 0)
        {   
            this.NuttyModeLabel.setPosition(-10000, -10000)
            if(this.Score == this.Currentscore){
                this.checkKeyboardInput()         
            }
        }
        else if(this.NuttyMode == 1)
        {   
            this.NuttyModeLabel.setPosition(400, 450)
            if(this.Score == this.Currentscore){
                this.checkNuttyKeyboardInput()     
            }
        }   
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
                      this.directionInput.up = true
                      break;
                    case 1:
                        this.directionInput.down = true
                      break;
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
        this.ScoreLabel.text = this.Score
    }

    decrementScore()
    {
        this.Score -= 1
        this.ScoreLabel.text = this.Score
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
        // TODO: check input from this.directionInput instead
        if(this.directionInput.up && this.dir == 1){
            this.incrementScore()
        }
        // else if(this.directionInput.up && this.dir != 1){
        //     this.decrementScore()
        // }
        if(this.directionInput.down && this.dir == 2){
            this.incrementScore()
        }
        // else if(this.directionInput.down && this.dir != 2){
        //     this.decrementScore()
        // }
        if(this.directionInput.left && this.dir == 3){
            this.incrementScore()
        }
        // else if(this.directionInput.left && this.dir != 3){
        //     this.decrementScore()
        // }
        if(this.directionInput.right && this.dir == 4){
            this.incrementScore()
        }
        // else if(this.directionInput.right && this.dir != 4){
        //     this.decrementScore()
        // }
    }

    checkMQTTNuttyKeyboardInput()
    {
        if(this.directionInput.up && this.dir == 2){
            this.incrementScore()
        }
        // else if(this.directionInput.up && this.dir != 2){
        //     this.decrementScore()
        // }
        if(this.directionInput.down && this.dir == 1){
            this.incrementScore()
        }
        // else if(this.directionInput.down && this.dir != 1){
        //     this.decrementScore()
        // }
        if(this.directionInput.left && this.dir == 4){
            this.incrementScore()
        }
        // else if(this.directionInput.left && this.dir != 4){
        //     this.decrementScore()
        // }
        if(this.directionInput.right && this.dir == 3){
            this.incrementScore()
        }
        // else if(this.directionInput.right && this.dir != 3){
        //     this.decrementScore()
        // }
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

export default Game
