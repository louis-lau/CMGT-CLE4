import { GameScene } from "./game-scene"
import { BackgroundLayer } from "../objects/background-layer"

export class Level2Scene extends GameScene {
    constructor() {
        super({ key: "Level2Scene" })
    }

    create() {
        // Create map and tileset from loaded json and image
        const map = this.make.tilemap({ key: "map-city2" })

        // Set bounds width to the width of the loaded map
        this.physics.world.bounds.width = map.widthInPixels

        // Create background music from loaded audio files and play
        const music = this.sound.add("spacetheme", { loop: true })

        // Add background layers with parallax effect
        let backgroundLayers: Array<BackgroundLayer> = []
        backgroundLayers.push(
            new BackgroundLayer(this, "city-sky"),
            new BackgroundLayer(this, "flat3", 232, 2.5),
            new BackgroundLayer(this, "flat", 200, 2),
            new BackgroundLayer(this, "flat2", 223, 1.5)
        )

        // Add Finish Line
        const finishline = map.createFromObjects("Finish", 8, { key: "finishline" })[0]

        // Create food and obstacle sprites and add to arrays, match textures to tiled gids
        let foods: Array<Phaser.GameObjects.Sprite> = []
        let obstacles: Array<Phaser.GameObjects.Sprite> = []
        let bullets: Array<Phaser.GameObjects.Sprite> = []
        foods = foods.concat(
            map.createFromObjects("Food", 1, { key: "chocolate" }),
            map.createFromObjects("Food", 5, { key: "fry" }),
            map.createFromObjects("Food", 4, { key: "fries" })
        )
        obstacles = obstacles.concat(
            map.createFromObjects("Obstacles", 2, { key: "cola-can" }),
            map.createFromObjects("Obstacles", 3, { key: "alcohol" }),
            map.createFromObjects("Obstacles", 7, { key: "sigaret" })
        )
        bullets = bullets.concat(map.createFromObjects("Ammo", 9, { key: "corn" }))

        const nextSceneKey = "FinishScene"

        super.create(map, music, backgroundLayers, foods, obstacles, bullets, finishline, nextSceneKey)
    }

    update() {
        super.update()
    }
}
