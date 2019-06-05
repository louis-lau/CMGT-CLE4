import { Player } from "../objects/player";
import { BackgroundLayer } from "../objects/background-layer";

export class GameScene extends Phaser.Scene {
    private player: Player;
    private backgroundLayers: Array<BackgroundLayer> = [];

    constructor() {
        super({ key: "GameScene" });
    }

    init(): void {}

    create(): void {
        // Create background music from loaded audio files and play
        const music = this.sound.add("spacetheme", { loop: true });
        music.play();
        this.events.on("shutdown", function() {
            music.stop();
        });

        // Create map and tileset from loaded json and image
        const map = this.make.tilemap({ key: "map-city" });

        // Set bounds width to the width of the loaded map
        this.physics.world.bounds.width = map.widthInPixels;

        // Add background layers with parallax effect
        this.backgroundLayers.push(
            new BackgroundLayer(this, "city-sky"),
            new BackgroundLayer(this, "flat", 117, 2.5),
            new BackgroundLayer(this, "house1", 223, 2),
            new BackgroundLayer(this, "house2", 223, 1.5)
        );

        this.player = new Player(this);

        let foods = [];
        foods = foods.concat(
            map.createFromObjects("Food", 2, { key: "chocolate" }),
            map.createFromObjects("Food", 5, { key: "fry" }),
            map.createFromObjects("Food", 4, { key: "fries" })
        );

        for (const food of foods) {
            this.physics.add.existing(food);
            this.physics.add.overlap(this.player, food, this.collectFood, null, this);
        }

        let obstacles = [];
        obstacles = obstacles.concat(
            map.createFromObjects("Obstacles", 3, { key: "cola-can" }),
            map.createFromObjects("Obstacles", 1, { key: "alcohol" })
        );

        for (const obstacle of obstacles) {
            this.physics.add.existing(obstacle);
            this.physics.add.overlap(this.player, obstacle, this.getDamage, null, this);
        }

        let finishline = map.createFromObjects("Finish", 7, { key: "finishline" })[0]
        console.log(finishline)
        this.physics.add.existing(finishline);
        this.physics.add.overlap(this.player, finishline, this.finish, null, this);

        // Set camera bounds and start following
        this.cameras.main.setBounds(0, 0, this.physics.world.bounds.width, this.physics.world.bounds.height);
        this.cameras.main.startFollow(this.player, true, undefined, undefined, -175);
    }

    private collectFood(player: Player, food: Phaser.Physics.Arcade.Sprite) {
        food.destroy();
        this.player.accelerate();
    }

    private getDamage(player: Player, obstacle: Phaser.Physics.Arcade.Sprite) {
        obstacle.destroy();
        this.player.lives--;
    }

    private finish() {
        this.scene.start("FinishScene");
    }

    update() {
        this.player.update();
        // Call update function for all backgroundlayers
        for (const backgroundLayer of this.backgroundLayers) {
            backgroundLayer.update(this.player.body.velocity.x);
        }
    }
}
