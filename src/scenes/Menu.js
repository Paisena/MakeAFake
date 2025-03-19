class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        // load images/tile sprites
        this.load.path = './assets/'
        this.load.image('pFloor', './pFloor.png')
        this.load.image('life', './LifeIcon.png')
        this.load.image('bomb','./bomb.png')
        this.load.image('player','./player.png')
        this.load.image('boss','./boss.png')
        this.load.image('background','./background.png')
        // load sounds
        this.load.audio('jump','./jumpSFX.mp3')
        this.load.audio('bomb', './bombSFX.mp3')
        this.load.audio('hurt', './damageSFX.wav')
        
    }

    create() {
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)


    }

    update () {
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.scene.start('playScene')
        }
    }
}