class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        
        console.log("play started")
        
        this.floor = this.physics.add.staticBody(0,800,1000,1000)
        //this.floor.setImmovable(true)
        
        this.cameras.main.setBackgroundColor("#FACADE")
        
        this.keys = this.input.keyboard.createCursorKeys()
        this.keys.HKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H)
        
        this.player = new Player(this, 200, 160, 'player', 0)
        
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
        
        this.physics.add.collider(this.player, this.floor, (player, floor) => {
            this.player.isGround = true
            console.log("touch groiund")
        })

        }

    update() {
        this.playerFSM.step()
        this.stateTrackerUI.text = this.player.isGround
    }

    
}