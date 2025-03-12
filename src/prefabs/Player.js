class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.body.setSize(this.width / 2 + 12, this.height / 2-10)
        this.body.setOffset(22, this.height/2)
        this.body.setCollideWorldBounds(true)
        this.body.setGravityY(100)

        this.isJump = false
        this.isGround = true

        this.jumpForce = -100
        this.velocity = 100

        this.lives = 3

        scene.playerFSM = new StateMachine('idle', {
            idle: new IdleState(),
            move: new MoveState(),
            jump: new JumpState(),
            hurt: new HurtState(),
            attack: new AttackState(),
        }, [scene, this])
    }

    checkLives() {
       if (this.lives <= 0) {
        console.log("DEAD HAHAHHAHAHHAHAH")
       } 
    }

    damaged() {
        //will have: change lives count on UI, handle player movement due to dmg
        this.lives -= 1
    }

    gameOver() {
        return
    }
}

class AttackState extends State {
    enter (scene, player) {
        player.setVelocityY(-100)

        this.stateMachine.transition('idle')
    }
}

class JumpState extends State {
    enter(scene, player) {
        const { left, right, up, down, space, shift } = scene.keys
        const HKey = scene.keys.HKey

        let moveDirection = new Phaser.Math.Vector2(0, 0)
        
        if(player.isGround)
        {
            moveDirection.normalize()
            player.setVelocityY(player.jumpForce)
        }
        
        this.stateMachine.transition('idle')
        player.isGround = false
        return
        //player.anims.play(`walk-${player.direction}`, true)
    }
}

class IdleState extends State {
    enter(scene, player) {
        player.setVelocityX(0)
    }

    execute(scene, player) {
        const { left, right, up, down, space, shift } = scene.keys
        const HKey = scene.keys.HKey

        if(left.isDown || right.isDown) {
            this.stateMachine.transition('move')
            return
        }
        if(up.isDown && player.isGround ) {
            this.stateMachine.transition('jump')
            return
        }
    }
}

class MoveState extends State {
    execute(scene, player) {
        const { left, right, up, down, space, shift } = scene.keys
        const HKey = scene.keys.HKey

        if(!(left.isDown || right.isDown)) {
            this.stateMachine.transition('idle')
            return
        }
        if(up.isDown && player.isGround) {
            this.stateMachine.transition('jump')
            return
        }

        let moveDirection = new Phaser.Math.Vector2(0, 0)
        
        if(left.isDown) {
            moveDirection.x = -1
            player.direction = 'left'
        } else if(right.isDown) {
            moveDirection.x = 1
            player.direction = 'right'
        }
        // normalize movement vector, update hero position, and play proper animation
        moveDirection.normalize()
        player.setVelocityX(player.velocity * moveDirection.x)
        //player.anims.play(`walk-${player.direction}`, true)
    }
}

class HurtState extends State {
    enter(scene, player) {
        player.setVelocityY(-10)
        console.log("hurt")
        player.damaged()
        player.checkLives()
        player.gameOver()
        scene.time.delayedCall(100, () => {
            player.clearTint()
            this.stateMachine.transition('idle')
        }) 
    }
}