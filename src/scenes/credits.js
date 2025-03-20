class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene")
    }

    create() {
        this.titleImg = this.add.sprite(1900/2,980/2,'credits')
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
    }

    update () {
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            console.log("play")
            this.scene.start('playScene')
        }
    }
}