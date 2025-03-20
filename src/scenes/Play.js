class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        this.background = this.add.image(0,0,'background').setOrigin(0)
        this.background.scaleY = 1.2
        
        
        
        this.floor = this.physics.add.staticBody(0,685,1999,1000)
        //this.floor.setImmovable(true)
        
        this.cameras.main.setBackgroundColor("#FACADE")
        
        this.keys = this.input.keyboard.createCursorKeys()
        this.keys.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.keys.keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        
        this.player = new Player(this, 200, 550, 'player', 0)
        this.boss = new Boss(this, 1500, 450, 'boss', 0)
        this.boss.scaleX = .8
        this.boss.scaleY = .8
        this.playerSide = -1
        this.livesArray = []
        
        this.gameOverTxt = this.add.image(this.game.config.width/2, this.game.config.height/2, 'gameOver')
        this.gameOverTxt.visible = false
        this.isPlaying = true
        
        for (let i = 0; i < this.player.lives; i++) {
            this.life = this.add.sprite(100 * (i + 1) , 100, 'life')
            this.livesArray.push(this.life)
        }

        this.physics.add.collider(this.player, this.floor, (player, floor) => {
            this.player.isGround = true
        })

        this.physics.add.overlap(this.player, this.boss, () => {

           
            if(!this.boss.isDamaged)
            {
                this.playerFSM.transition("attack")
                this.bossFSM.transition("hurt")
                if (this.boss.lives <= 0) {
                    this.gameOver(true)
                }
                return
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
        this.gameOverTxt.visible = true
        this.player.body.moves = false
        this.isPlaying = false
        this.bossFSM.transition("dead")
    }

    update() {
        if(this.isPlaying) {
            if(this.playerSide == 1)
            {
                this.boss.flipX = true
            }
            else {
                this.boss.flipX = false
            }
            this.playerFSM.step()
            this.bossFSM.step()
            this.boss.update()
            this.physics.add.overlap(this.player, this.boss.bombGroup, (player, bomb) => {
                this.playerFSM.transition('hurt')
                bomb.destroy()
                this.updatelifeUI()
            })

            this.checkSidePlayer()
        }
        else {
            if (Phaser.Input.Keyboard.JustDown(this.keys.keyENTER)) {
                this.scene.restart()
            }
            if (Phaser.Input.Keyboard.JustDown(this.keys.keySPACE)) {
                this.scene.start('creditsScene')
            }
        }
    }
}