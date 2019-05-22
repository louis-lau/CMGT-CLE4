import { Player } from "../objects/player"
import { Platform } from "../objects/platform"
import { MovingPlatform } from "../objects/movingplatform"

export class GameScene extends Phaser.Scene {

    private player: Player
    private food: Phaser.Physics.Arcade.Group
    private flats: Phaser.GameObjects.TileSprite
    private house1: Phaser.GameObjects.TileSprite
    private house2: Phaser.GameObjects.TileSprite

    constructor() {
        super({ key: "GameScene" })
    }

    init(): void {

    }

    create(): void {
        this.physics.world.bounds.width = 5000

        this.add.tileSprite(0, 0, this.physics.world.bounds.width, 270, 'city-sky').setOrigin(0);
        this.flats = this.add.tileSprite(50, 117, this.physics.world.bounds.width, 270, 'flat').setOrigin(0);
        this.house1 = this.add.tileSprite(100, 223, this.physics.world.bounds.width, 270, 'house1').setOrigin(0);
        this.house2 = this.add.tileSprite(300, 223, this.physics.world.bounds.width, 270, 'house2').setOrigin(0);

        this.player = new Player(this)

        this.cameras.main.setSize(480, 270)          // canvas size
        this.cameras.main.setBounds(0, 0, this.physics.world.bounds.width, 270) // world size
        this.cameras.main.startFollow(this.player, true, 1, 1, -175)


        // 11 cans
        this.food = this.physics.add.group({
            key: 'cola-can',
            repeat: 11,
            setXY: { x: 12, y: 30, stepX: 70 },
        })

    }

    private collectStar(player : Player , star) : void {
        this.food.remove(star, true, true)
        this.registry.values.score++

        // TO DO check if we have all the stars, then go to the end scene
    
    }

    update(){
        this.player.update()
        this.flats.tilePositionX -= 2.5;
        this.house1.tilePositionX -= 2;
        this.house2.tilePositionX -= 2;
    }

}
