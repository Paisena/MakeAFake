class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        
        console.log("play started")
        
        this.floor = this.physics.add.staticBody(0,800,1999,1000)
        //this.floor.setImmovable(true)
        
        this.cameras.main.setBackgroundColor("#FACADE")
        
        this.keys = this.input.keyboard.createCursorKeys()
        this.keys.HKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H)
        
        this.player = new Player(this, 200, 680, 'player', 0)
        this.boss = new Boss(this, 700, 500, 'boss', 0)
        this.playerSide = -1
        this.livesArray = []

        this.isPlaying = true
        
        for (let i = 0; i < this.player.lives; i++) {
            this.life = this.add.sprite(100 * (i + 1) , 100, 'life')
            this.livesArray.push(this.life)
        }
        
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.stateTrackerUI = this.add.text(game.config.width/2, game.config.height/2, '', scoreConfig).setOrigin(0.5)
        this.stateTrackerBossUI = this.add.text(game.config.width/2, game.config.height/2 + 100, '', scoreConfig).setOrigin(0.5)

        this.gameOverUI = this.add.text(game.config.width/2, game.config.height/2, 'Game Over!', scoreConfig).setOrigin(0.5)
        this.gameOverUI.visible = false

        this.physics.add.collider(this.player, this.floor, (player, floor) => {
            this.player.isGround = true
        })


        this.physics.add.overlap(this.player, this.boss, () => {
            if(!this.boss.isDamaged)
            {
                console.log("hey")
                this.playerFSM.transition("attack")
                this.bossFSM.transition("hurt")
                if (this.boss.lives <= 0) {
                    this.gameOver(true)
                }
            }
            
        })

        this.physics.add.collider(this.boss, this.floor, () => {
            this.boss.isJumping = false
        })
    }

    updatelifeUI() {
        let sprite = this.livesArray.pop()
        sprite.destroy(true)

        if(this.livesArray.length == 0) {
            this.gameOver(false)
        }
    }

    checkSidePlayer() {
        if (this.player.x > this.boss.x) {
            this.playerSide = -1
        }

        else {
            this.playerSide = 1
        }
    }

    gameOver(winner) {
        this.player.body.moves = false
        this.isPlaying = false
        this.gameOverUI.visible = true
        this.bossFSM.transition("dead")
        if(winner) {
            this.gameOverUI.text = "You Win!"
        }
        else {
            this.gameOverUI.text = "Game Over"
        }
    }

    update() {
        if(this.isPlaying) {
            this.playerFSM.step()
            this.bossFSM.step()
            this.boss.update()
            this.physics.add.overlap(this.player, this.boss.bombGroup, (player, bomb) => {
                console.log("collided")
                this.playerFSM.transition('hurt')
                bomb.destroy()
                this.updatelifeUI()
            })

            this.stateTrackerBossUI.text = this.bossFSM.state
            this.stateTrackerUI.text = this.boss.isDamaged
    
            this.checkSidePlayer()
        }
        else {

        }
        
    }
}