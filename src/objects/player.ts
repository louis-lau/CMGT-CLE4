export class Player extends Phaser.Physics.Arcade.Sprite {

    private cursors: Phaser.Types.Input.Keyboard.CursorKeys

    constructor(scene) {
        super(scene, 50, 135, "pigeon")

        this.cursors = this.scene.input.keyboard.createCursorKeys()
        
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.setCollideWorldBounds(true)
        this.setBounce(0.2)
        this.setDragY(600)
        this.setVelocityX(200)
    }

    public update(): void {
        
        if (this.cursors.up.isDown) {
            this.setVelocityY(-200)
        } else if (this.cursors.down.isDown) {
            this.setVelocityY(200)
        }

        if (this.body.velocity.x >200) {
        this.slowDown()
        } else if (this.body.velocity.x <=200) {
            this.body.velocity.x= 200
        }
    } 

    public accelerate() {
        if (this.body.velocity.x <= 700) {
            this.body.velocity.x+= 20
        }
    }    
        
    public slowDown() {
            this.setDragX(20)
        }
    }
    
        // jump when the body is touching the floor
        /*
        let grounded = this.body.touching.down 
        if (this.cursors.up.isDown && grounded) {
            this.setVelocityY(-400)
        }
        */
    }

