class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {

        this.isRunning = true

        this.currentLetter = 0
        this.count = 1000
        this.score = 0

        this.wordList = ["plane", "hi", "cow", "make", "half", "bard", "dock", "apple", "carrot"]

        this.wordPresent = []
        this.wordPresentTxt = []
        
        console.log("play started")
        this.input.keyboard.on("keydown", event => {
            if(event.keyCode == 37) {
                for (let i = 0; i < this.wordPresent.length; i++) {
                    if (this.wordPresent[i].index != 0)
                    {
                        console.log("caught")
                        this.currentLetter = this.wordPresent[i].current
                        this.wordPresent[i].enabled = false
                        console.log(this.currentLetter)
                    }
                }
            }
            else if(event.keyCode == 39) {
                for (let i = 0; i < this.wordPresent.length; i++) {
                    if (this.wordPresent[i].index != 0)
                    {
                        console.log("caught")
                        this.currentLetter = this.wordPresent[i].current
                        this.wordPresent[i].enabled = false
                        console.log(this.currentLetter)
                    }
                }
            }
        })
        this.add.rectangle(0, 0, this.game.config.width,this.game.config.width, 0x00FF00).setOrigin(0,0)
        
        let wordConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 500
        }

        this.input.keyboard.on("keycombomatch",  (combo, event) => {
            console.log('Konami Code entered!')
            this.wordFound()            
            for (let i = 0; i < this.wordPresent.length; i++) {
                //console.log(this.wordPresent[i])
                
                if (combo.keyCodes == this.wordPresent[i].keyCodes) {
                    this.removeWord(i)
                }
            }
        });
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
    }

    update() {
        if(this.isRunning) {
            
        }
    }

    textUpdate() {
        this.wordUI.text = "Word:\n"
        for (let i = 0; i < this.wordPresent.length; i++) {
            this.wordUI.text += this.wordPresentTxt[i] + "\n"
        }

        this.scoreUI.text = "Score: " + this.score
        this.timerUI.text = "time: " + this.count
    }

    checkCollision(char, rock) {
        // simple AABB checking 
        if( rock.x < char.x + char.width && 
            rock.x + rock.width > char.x && 
            rock.y < char.y + char.height && 
            rock.height + rock.y > char.y ) {
            return true
        } else {
            console.log("not hit")
            return false
        }
    }
}