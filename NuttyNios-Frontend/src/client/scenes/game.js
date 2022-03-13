import Phaser from 'phaser'

class Game extends Phaser.Scene
{
    refreshFrameTimer = Phaser.Time.TimerEvent;
    refreshFrameInterval = 1000;
    init()
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

        this.arrowUp = this.add.polygon(400, 150, '40 0 40 20 100 20 100 80 40 80 40 100 0 50', 0xffffff, 1)
        this.arrowUp.setAngle(90)

        this.arrowDown = this.add.polygon(400, 350, '40 0 40 20 100 20 100 80 40 80 40 100 0 50', 0xffffff, 1)
        this.arrowDown.setAngle(270)

        this.arrowLeft = this.add.polygon(300, 250, '40 0 40 20 100 20 100 80 40 80 40 100 0 50', 0xffffff, 1)

        this.arrowRight = this.add.polygon(500, 250, '40 0 40 20 100 20 100 80 40 80 40 100 0 50', 0xffffff, 1)
        this.arrowRight.setAngle(180)

        this.gameName = this.add.circle(400, 250, 35, 0xffffff, 1)
        
        const scoreStyle = {
            fontSize: 48
        }

        const titleStyle = {
            fontSize: 20
        }

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
    
    // this function is called every refreshFrameInterval
    TimerEvent()
    {
        // gets a new frame
        this.Currentscore = this.Score
        this.dir = Phaser.Math.Between(1,4)
        this.revertarrowColor()
        this.setArrowColor()
    }

    setArrowColor()
    {
        if(this.dir==1){
            this.arrowUp.fillColor = 0xff0000 + Phaser.Math.Between(100, 50000)
        }
        else if(this.dir==2){
            this.arrowDown.fillColor = 0xff0000 + Phaser.Math.Between(100, 50000)
        }
        else if(this.dir==3){
            this.arrowLeft.fillColor = 0xff0000 + Phaser.Math.Between(100, 50000)
        }
        else if(this.dir==4){
            this.arrowRight.fillColor = 0xff0000 + Phaser.Math.Between(100, 50000)
        }
    }

    incrementScore()
    {
        this.Score += 1
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
        if(this.cursors.shift.isDown){
            this.NuttyMode = !this.NuttyMode
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
