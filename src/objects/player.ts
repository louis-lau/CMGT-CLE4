import { Scale/*, Input*/ } from "phaser";

export class Player extends Phaser.Physics.Arcade.Sprite {
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    //private key : Phaser.Types.Input.Keyboard.ASDW;
    //private space: Phaser.Types.Input.Keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    public lives = 3;
    private loadShoot = 0;
    public corn: Phaser.Physics.Arcade.Sprite;

    constructor(scene) {
        super(scene, 50, 135, "pigeon");

        this.cursors = this.scene.input.keyboard.createCursorKeys();

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setBounce(0.2);
        this.setDragY(600);
        this.setDragX(20);
        this.setVelocityX(200);
        this.createShit();
    }

    public update(): void {
        if (this.cursors.left.isDown || this.cursors.up.isDown) {
            this.setVelocityY(-200);
        } else if (this.cursors.right.isDown || this.cursors.down.isDown) {
            this.setVelocityY(200);
        }
        
        //if(this.input.keyboard.isDown(87))

        if (this.cursors.space.isDown && this.loadShoot == 0) {
            this.corn = this.scene.physics.add.sprite(this.getTopRight().x + 1, this.getTopRight().y + 5, "corn");
            this.corn.setVelocityX(this.body.velocity.x + 150);
            this.loadShoot++;
        }

        /*else if (this.cursors.space.isDown && this.loadShoot == 0) {
            this.corn = this.scene.physics.add.sprite(this.getTopRight().x + 1, this.getTopRight().y + 5, "corn");
            this.corn.setVelocityX(this.body.velocity.x + 150)
            //  this.corn.setAngle(12);
            //  this.corn.setVelocityY(150);
            this.loadShoot++
        }*/


        if (this.cursors.space.isUp) {
            this.loadShoot = 0;
        }

        if (this.lives < 0 || this.body.velocity.x <= 0) {
            this.scene.scene.start("EndScene");
        }
    }

    public accelerate() {
        if (this.body.velocity.x <= 700) {
            this.body.velocity.x += 20;
        }
    }

    private createShit() {
        let whiteShit = this.scene.add.particles("white-shit");
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
        });

        let greenShit = this.scene.add.particles("green-shit");
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
        });

        let greenShit2 = this.scene.add.particles("green-shit");
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
        });

        greenShitEmitter.startFollow(this);
        greenShit2Emitter.startFollow(this);
        whiteShitEmitter.startFollow(this);
    }
}
