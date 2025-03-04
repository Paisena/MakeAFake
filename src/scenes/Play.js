class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        
        console.log("play started")
        
        this.add.rectangle(0,800, this.game.config.width, this.game.config.height, 0X000000).setOrigin(0,0)
    
        this.cameras.main.setBackgroundColor("#FACADE")
        
        this.keys = this.input.keyboard.createCursorKeys()
        this.keys.HKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H)

        this.player = new Player(this, 200, 160, 'player', 0)



        }

    update() {
        this.playerFSM.step()
    }

    
}