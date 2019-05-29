import { Player } from "../objects/player"
import { BackgroundLayer } from "../objects/background-layer";
import { Platform } from "../objects/platform"
import { MovingPlatform } from "../objects/movingplatform"

export class GameScene extends Phaser.Scene {

    private player: Player
    private backgroundLayers: Array<BackgroundLayer> = []
    
    constructor() {
        super({ key: "GameScene" })
    }
    
    init(): void {
        
    }
    
    create(): void {
        // Create background music from loaded audio files and play
        const music = this.sound.add('spacetheme', {loop: true});
        music.play();

            
       
        // Create map and tileset from loaded json and image
        const map = this.make.tilemap({ key: "map-city" });
        const tileset = map.addTilesetImage("tileset");
        
        // Set bounds width to the width of the loaded map
        this.physics.world.bounds.width = map.widthInPixels
        
        // Add background layers with parallax effect
        this.backgroundLayers.push(
            new BackgroundLayer(this,"city-sky"),
            new BackgroundLayer(this,"flat", 117, 2.5),
            new BackgroundLayer(this,"house1", 223, 2),
            new BackgroundLayer(this,"house2", 223, 1.5)
        )
        
        // Load tilemap to scene
        console.log(map)
        let singleFries = map.createFromObjects("Object Layer 1", 3, {});
        console.log(singleFries)

        this.player = new Player(this)

        // Set camera bounds and start following
        this.cameras.main.setBounds(0, 0, this.physics.world.bounds.width, this.physics.world.bounds.height)
        this.cameras.main.startFollow(this.player, true, undefined, undefined, -175)
    }

    update(){
        this.player.update()
        // Call update function for all backgroundlayers
        for (const backgroundLayer of this.backgroundLayers) {
            backgroundLayer.update(this.player.body.velocity.x)
        }
    }

}
