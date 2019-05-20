import { Player } from "../objects/player"
import { Platform } from "../objects/platform"
import { MovingPlatform } from "../objects/movingplatform"

export class GameScene extends Phaser.Scene {

    private player: Player
    private food: Phaser.Physics.Arcade.Group
    private bg: Phaser.GameObjects.TileSprite

    constructor() {
        super({ key: "GameScene" })
    }

    init(): void {

    }

    create(): void {
        // this.add.image(0, 0, 'background1').setOrigin(0, 0)      
        this.bg = this.add.tileSprite(0, 0, 5000, 270, 'background1').setOrigin(0);

        // 11 STARS
        this.food = this.physics.add.group({
            key: 'cola-can',
            repeat: 11,
            setXY: { x: 12, y: 30, stepX: 70 },
        })

        // TODO add player
        this.player = new Player(this)

        //this.platforms = this.add.group({ runChildUpdate: true })
        //this.platforms.addMultiple([], true)
        
        // define collisions for bouncing, and overlaps for pickups
        // this.physics.add.collider(this.stars, this.platforms)
        // this.physics.add.collider(this.player, this.platforms)
        
        // this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this)
        this.physics.world.bounds.width = 5000

        this.cameras.main.setSize(480, 270)          // canvas size
        this.cameras.main.setBounds(0, 0, this.physics.world.bounds.width, 270) // world size
        this.cameras.main.startFollow(this.player, true, 1, 1, -175)

    }

    private collectStar(player : Player , star) : void {
        this.food.remove(star, true, true)
        this.registry.values.score++

        // TO DO check if we have all the stars, then go to the end scene
    
    }

    update(){
        this.player.update()
        this.bg.tilePositionX -= 1;
    }

}
