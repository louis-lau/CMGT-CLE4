import { Scale /*, Input*/ } from "phaser"
import { Joystick } from "../utils/arcade/input/joystick"
import { Game } from "../app"

export class Player extends Phaser.Physics.Arcade.Sprite {
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys
    //private key : Phaser.Types.Input.Keyboard.ASDW;
    //private space: Phaser.Types.Input.Keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    public lives = 3
    private loadShoot = 0
    public ammo = 0
    public corn: Phaser.Physics.Arcade.Sprite
    private joystick: Joystick

    private shootListener: EventListener
    private shootUpListener: EventListener
    private shootDownListener: EventListener

    constructor(scene) {
        super(scene, 50, 135, "pigeon")



        this.shootListener = () => this.shoot()
        document.addEventListener("joystick1button0", this.shootListener)
        
        this.shootUpListener = () => this.shootUp()
        document.addEventListener("joystick1button0", this.shootUpListener)

        this.shootDownListener = () => this.shootDown()
        document.addEventListener("joystick1button0", this.shootDownListener)


        // gameover, shut down, andere scene
        // document.removeEventListener("joystick0button0", this.shootListerner)

        this.cursors = this.scene.input.keyboard.createCursorKeys()

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        scene.sound.add("shoot")

        this.setCollideWorldBounds(true)
        this.setBounce(0.2)
        this.setDragY(600)
        this.setDragX(20)
        this.setVelocityX(200)
        this.createShit()
    }

    public update(): void {
        if (this.cursors.up.isDown) {
            this.setVelocityY(-200)
        } else if (this.cursors.down.isDown) {
            this.setVelocityY(200)
        }

        let ourGame = this.scene.game as Game
        for (const joystick of ourGame.Arcade.Joysticks) {
            joystick.update()

            if (ourGame.Arcade.Joysticks[0].Up) {
                this.setVelocityY(-200)
            } else if (ourGame.Arcade.Joysticks[0].Down) {
                this.setVelocityY(200)
            }
        }

        if (this.lives <= 0 || this.body.velocity.x <= 0) {
            this.scene.scene.start("EndScene")
        }
    }

    public accelerate() {
        if (this.body.velocity.x <= 700) {
            this.body.velocity.x += 20
        }
    }

    private createShit() {
        let whiteShit = this.scene.add.particles("white-shit")
        let whiteShitEmitter = whiteShit.createEmitter({
            x: -18,
            y: 0,
            scale: { ease: "linear", min: 1, max: 1.5 },
            lifespan: 2000,
            speed: 0,
            angle: { min: 160, max: 200 },
            gravityY: 300,
            quantity: 2,
            blendMode: "NORMAL"
        })

        let greenShit = this.scene.add.particles("green-shit")
        let greenShitEmitter = greenShit.createEmitter({
            x: -18,
            y: 0,
            scale: { ease: "linear", min: 1, max: 1.5 },
            lifespan: 2000,
            speed: 0,
            angle: { min: 160, max: 200 },
            gravityY: 300,
            quantity: 2,
            blendMode: "NORMAL",
            frequency: 1000
        })

        let greenShit2 = this.scene.add.particles("green-shit")
        let greenShit2Emitter = greenShit2.createEmitter({
            x: -18,
            y: 0,
            scale: { ease: "linear", min: 1, max: 1.5 },
            lifespan: 2000,
            speed: 0,
            angle: { min: 160, max: 200 },
            gravityY: 300,
            quantity: 2,
            blendMode: "NORMAL",
            frequency: 600
        })

        greenShitEmitter.startFollow(this)
        greenShit2Emitter.startFollow(this)
        whiteShitEmitter.startFollow(this)
    }

    
    public shoot() {
        let ourGame = this.scene.game as Game 
        
        if (this.ammo > 0) {
                
                if (!ourGame.Arcade.Joysticks[1].Up && !ourGame.Arcade.Joysticks[1].Down) {
                    this.corn = this.scene.physics.add.sprite(this.getTopRight().x + 1, this.getTopRight().y + 5, "corn")
                    this.corn.setVelocityX(this.body.velocity.x + 150)
                    this.scene.sound.play("shoot")
                    this.ammo--
                }
            }
        }
    


      public shootUp() {
        let ourGame = this.scene.game as Game 

        if (this.ammo > 0) {
          
                if (ourGame.Arcade.Joysticks[1].Up) {
                    this.corn = this.scene.physics.add.sprite(this.getTopRight().x + 1, this.getTopRight().y + 5, "corn")
                    this.corn.setVelocityX(this.body.velocity.x + 150)
                    this.corn.setVelocityY(-150)
                    this.scene.sound.play("shoot")
                    this.ammo--
                }
            }
        }
    
 

   public shootDown() {
        let ourGame = this.scene.game as Game 
        if (this.ammo > 0) {
          
                if (ourGame.Arcade.Joysticks[1].Down) { 
                    this.corn = this.scene.physics.add.sprite(this.getTopRight().x + 1, this.getTopRight().y + 5, "corn")
                    this.corn.setVelocityX(this.body.velocity.x + 150)
                    this.corn.setVelocityY(150)
                    this.scene.sound.play("shoot")
                    this.ammo--
                }
            }
        }
  

    public killController() {
        document.removeEventListener("joystick1button0", this.shootListener)
    }
}
