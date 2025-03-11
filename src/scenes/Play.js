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
        
        this.player = new Player(this, 200, 750, 'player', 0)
        this.boss = new Boss(this, 400, 750, 'boss', 0)
        this.bomb = new Bomb(this, 1900,750, 'bomb', 0)
        
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

        this.stateTrackerUI = this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
        this.stateTrackerBossUI = this.add.text(game.config.width/2, game.config.height/2 + 100, 'GAME OVER', scoreConfig).setOrigin(0.5)
        
        this.physics.add.collider(this.player, this.floor, (player, floor) => {
            this.player.isGround = true
        })

        this.physics.add.collider(this.player, this.boss, () => {
            console.log("hey")
        })

        this.physics.add.collider(this.boss, this.floor)

    }

    update() {
        this.playerFSM.step()
        this.bossFSM.step()
        this.boss.update()
        this.bomb.update()
        this.physics.add.collider(this.player, this.boss.bombGroup, (player, bomb) => {
            console.log("collided")
            bomb.destroy()
        })

        this.stateTrackerBossUI.text = this.bossFSM.state
        this.stateTrackerUI.text = this.player.isGround
    }

    
}