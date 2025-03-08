class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        
        console.log("play started")
        
        this.floor = this.physics.add.sprite(0,800).setOrigin(0,0)
        this.floor.setImmovable(true)
    
        
        this.cameras.main.setBackgroundColor("#FACADE")
        
        this.keys = this.input.keyboard.createCursorKeys()
        this.keys.HKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H)
        
        this.player = new Player(this, 200, 160, 'player', 0)
        
        
        this.physics.add.collider(this.player, this.floor, (player, floor) => {
            this.player.isGround = true
            console.log("touch groiund")
        })

        }

    update() {
        this.playerFSM.step()
    }

    
}