import Phaser from 'phaser'

class Game extends Phaser.Scene
{
    init()
    {
        this.Score = 0
    }

    preload()
    {
         
    }

    create()
    {
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

        this.cursors = this.input.keyboard.createCursorKeys() // can access cursor keys, space bar and shift
    }

    update()
    {

        for (let i = 0; i < 1000; i++){
            const dir = Phaser.Math.Between(1,4);

            this.revertarrowColor()
            
            if(dir == 1){
                this.arrowUp.fillColor = 0xff0000
                
                // begin timer
                this.time.delayedCall(2000, this.revertarrowColor());  
                 // check for keyboard input
                 this.checkKeyboardInput()            
            }
            else if(dir == 2){
                this.arrowDown.fillColor = 0xff0000
            }
            else if(dir == 3){
                this.arrowLeft.fillColor = 0xff0000
            }
            else if(dir == 4){
                this.arrowRight.fillColor = 0xff0000
            }
        }


    }
dia == 1{}
            this.arrowUp.fillColor = 0xff0000
        
    
    newFrame(a)
    {
        
    }
if()
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

    checkKeyboardInput()
    {
        if(this.cursors.up.isDown){
            this.incrementScore()
        }
    }

}

export default Game

