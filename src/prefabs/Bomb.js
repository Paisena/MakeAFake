class Bomb extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, dir) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.dir = dir
        this.body.setSize(this.width / 2, this.height / 2)
        this.body.setCollideWorldBounds(true)
        
    }

    update() {
        this.x -= 5 * this.dir
        if(this.x <= 0 || this.x >= 1990)
        {
            this.destroy(true)
            this.x = 1900
        }
    }
}