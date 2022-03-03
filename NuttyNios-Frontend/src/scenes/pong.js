import Phaser from 'phaser'

class Game extends Phaser.Scene
{
    init()
    {
        this.paddleRightVelocity = new Phaser.Math.Vector2(0,0)

        this.leftScore = 0
        this.rightScore = 0
    }

    preload()
    {
         
    }

    create()
    {
        this.physics.world.setBounds(-100, 0, 1000, 500) //x bound set to -100 so ball can go out of bounds, width = 800 + 200
        // const makes a local variable in create, can't be changed in update
        this.ball =  this.add.circle(400, 250, 10, 0xffffff, 1) //(x-pos, y-pos, radius, colour, transparency[0-1]), polygon for arrow?
        this.arrow = this.add.polygon(400, 250, '40 0 40 20 100 20 100 80 40 80 40 100 0 50', 0xffffff, 1)
        this.arrow.setAngle(90)

        this.physics.add.existing(this.ball)
        this.ball.body.setBounce(1,1) //coefficient of restitution in x and y direction

        this.ball.body.setCollideWorldBounds(true, 1, 1) //true if the Body should collide with the world bounds, bounceX, bounceY

        this.resetBall()

        //adding this. makes paddleLeft a class, allowing us to change it in update
        this.paddleLeft = this.add.rectangle(50,250, 30, 100, 0xffffff, 1) //(x-pos, y-pos, width, height, colour, transparency[0-1])
        this.physics.add.existing(this.paddleLeft, true) //true if you want object to be static body

        this.paddleRight = this.add.rectangle(750, 250, 30, 100, 0xffffff, 1)
        this.physics.add.existing(this.paddleRight, true)

        this.physics.add.collider(this.paddleLeft, this.ball)
        this.physics.add.collider(this.paddleRight, this.ball)
        
        const scoreStyle = {
            fontSize: 48
        }
        this.leftScoreLabel = this.add.text(300, 125, '0', scoreStyle)
            .setOrigin(0.5, 0.5)

        this.rightScoreLabel = this.add.text(500, 375, '0', scoreStyle)
            .setOrigin(0.5, 0.5)

        this.cursors = this.input.keyboard.createCursorKeys() // can access cursor keys, space bar and shift
    }

    update()
    {
        /* @type {Phaser.Physics.Arcade.StaticBody} */
        const body = this.paddleLeft.body
        const body2 = this.paddleRight.body

        if(this.cursors.up.isDown) // if up key is pressed down
        {
            // console.log('up pressed'), // check if up key is pressed in console
            this.paddleLeft.y -= 10
            body.updateFromGameObject()//updates physics box to wherever we move rectangle
        }
        else if(this.cursors.down.isDown)
        {
            // console.log('down pressed'), // check if down key is pressed in console
            this.paddleLeft.y += 10
            body.updateFromGameObject()
        }

        const diff = this.ball.y - this.paddleRight.y

        if(Math.abs(diff) < 10)
        {   //do nothing
            return 
        }

        const aiSpeed = 3

        if(diff < 0)
        {
            //ball is above paddle
            this.paddleRightVelocity.y = -aiSpeed //accelerate upwards
            if(this.paddleRightVelocity.y < -10)
            {
                this.paddleRightVelocity.y = -10 //cap at -10
            }
        }
        else if(diff > 0)
        {
            //ball is below paddle
            this.paddleRightVelocity.y = aiSpeed //accelerate downwards
            if(this.paddleRightVelocity.y > 10)
            {
                this.paddleRightVelocity.y = 10 //cap at 10
            }
        }

        this.paddleRight.y += this.paddleRightVelocity.y //always adding because velocity is +/-
        body2.updateFromGameObject()
        
        if(this.ball.x < -30)
        {
            //scored on left side
            this.resetBall()
            this.incrementLeftScore()
            this.arrow.fillColor = 0xff0000
        }
        else if(this.ball.x > 830)
        {
            //scored on right side
            this.resetBall()
            this.incrementRightScore()
        }

    }

    incrementLeftScore()
    {
        this.leftScore += 1
        this.leftScoreLabel.text = this.leftScore
    }

    incrementRightScore()
    {
        this.rightScore += 1
        this.rightScoreLabel.text = this.rightScore
    }

    resetBall()
    {
        this.ball.setPosition(400, 250)

        const angle = Phaser.Math.Between(0,360)
        const vec = this.physics.velocityFromAngle(angle, 200)

        this.ball.body.setVelocity(vec.x, vec.y) //set velocity in x and y direction
    }
}

export default Game

