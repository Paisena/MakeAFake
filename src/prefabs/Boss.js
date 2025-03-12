class Boss extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.body.setSize(this.width / 2, this.height / 2)
        this.body.setCollideWorldBounds(true)
        this.body.setGravityY(100)

        this.lives = 5
        this.isJumping = false
        this.isDamaged = false

        this.bombArray = []
        this.bombGroup = scene.add.group()

        scene.bossFSM = new StateMachine('idle', {
            idle: new BossIdleState(),
            move: new BossMoveState(),
            jump: new BossJumpState(),
            hurt: new BossHurtState(),
            attack: new BossAttackState()
        }, [scene, this])
    }

    update() {
        for(let i = 0; i < this.bombArray.length; i++)
        {
            this.bombArray[i].update()
        }
    }

    checkLives() {
            if (this.lives <= 0) {
                console.log("killed boss")
            }
    }

    damaged() {
        this.lives -= 1
        this.checkLives()
        this.isDamaged = true
    }

    
}

class BossJumpState extends State {
    enter(scene, boss) {
        let moveVector = new Phaser.Math.Vector2(0,0)
        moveVector.y = -1
        boss.setVelocityY(-100)
        this.stateMachine.transition("idle")
        return
        // const { left, right, up, down, space, shift } = scene.keys
        // const HKey = scene.keys.HKey

        // let moveDirection = new Phaser.Math.Vector2(0, 0)
        
        // // normalize movement vector, update hero position, and play proper animation
        // if(player.isGround)
        // {
        //     console.log("jumps")
        //     moveDirection.normalize()
        //     player.setVelocityY(player.jumpForce)
        // }
        
        // this.stateMachine.transition('idle')
        // player.isGround = false
        // return
        // //player.anims.play(`walk-${player.direction}`, true)
    }
}

class BossIdleState extends State {
    enter(scene, boss) {
        scene.time.delayedCall(1000, () => {
            if(this.stateMachine.state != "idle") {
                 console.log("canceld idle trigger")
                 return
            }
            console.log("playing idle decision")
            //pick random number and then based on that choose attack 

            let select = Math.floor(Math.random() * 4)
            if (select == 2)
            {
                if (boss.isJumping) {
                    select = Math.floor(Math.random() * 4)
                }
                else {
                    this.stateMachine.transition("jump")
                    boss.isJumping = true
                    //console.log("transionton to jump")
                    return 
                }
            }
            if (select == 0)
            {
                this.stateMachine.transition('idle')
                //console.log("transiotion to idle")
                return
            }
            if (select == 1)
            {
                this.stateMachine.transition('attack')
                //console.log("transition to attack")
                return
            }
            
            if (select == 3)
            {
                this.stateMachine.transition("move")
                //console.log("transition to move")
                return
            }
        })
    }
}

class BossMoveState extends State {
    execute(scene, boss) {
        //will implement movement later
        this.stateMachine.transition("idle")
        return
    }
}

class BossHurtState extends State {
    enter(scene, boss) {
        boss.setVelocity(0)
        boss.damaged()
        scene.time.delayedCall(3000, () => {
            boss.clearTint()
            boss.isDamaged = false
            this.stateMachine.transition('idle')
            console.log("damge done")
            return
        })
    }
}

class BossAttackState extends State {
    enter(scene, boss) {
        let bomb = new Bomb(scene, 1900,790, 'bomb', 0)
        boss.bombArray.push(bomb)
        boss.bombGroup.add(bomb)
        
        this.stateMachine.transition("idle")
        return
    }
}

