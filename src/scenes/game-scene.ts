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
        // Create map and tileset from loaded json and image
        const map = this.make.tilemap({ key: "map-city" });
        const tileset = map.addTilesetImage("tileset");
        
        // Set bounds width to the width of the loaded map
        this.physics.world.bounds.width = map.widthInPixels
        
        this.add.tileSprite(0, 0, this.physics.world.bounds.width, this.physics.world.bounds.height, 'city-sky').setOrigin(0);
        this.flats = this.add.tileSprite(0, 117, this.physics.world.bounds.width, this.physics.world.bounds.height, 'flat').setOrigin(0);
        this.house1 = this.add.tileSprite(0, 223, this.physics.world.bounds.width, this.physics.world.bounds.height, 'house1').setOrigin(0);
        this.house2 = this.add.tileSprite(0, 223, this.physics.world.bounds.width, this.physics.world.bounds.height, 'house2').setOrigin(0);
        
        const mainLayer = map.createStaticLayer("Tile Layer 1", tileset, 0, 0.28125);
        this.player = new Player(this)

        this.cameras.main.setBounds(0, 0, this.physics.world.bounds.width, this.physics.world.bounds.height) // world size
        this.cameras.main.startFollow(this.player, true, undefined, undefined, -175)
    }

    update(){
        this.player.update()
        this.flats.tilePositionX -= 2.5;
        this.house1.tilePositionX -= 2;
        this.house2.tilePositionX -= 1.5;
    }

}
