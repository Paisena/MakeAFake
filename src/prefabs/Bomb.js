class Bomb extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.body.setSize(this.width / 2, this.height / 2)
        this.body.setCollideWorldBounds(true)
        
    }

    update() {
        this.x -= 5
        if(this.x <= 0)
        {
            this.destroy(true)
            this.x = 1900
        }
    }
}