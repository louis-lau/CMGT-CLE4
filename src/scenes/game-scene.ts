import { Player } from "../objects/player";
import { BackgroundLayer } from "../objects/background-layer";
import { UIScene } from "../scenes/ui-scene"

export class GameScene extends Phaser.Scene {
    private player: Player;
    private backgroundLayers: Array<BackgroundLayer> = [];
    private obstacles = [];

    constructor() {
        super({ key: "GameScene" });
    }

    init(): void {}

    create(): void {
        this.scene.add("UIScene", new UIScene("UIScene"), true)

        // Create background music from loaded audio files and play
        const music = this.sound.add("spacetheme", { loop: true });
        music.play();
        this.events.on("shutdown", function() {
            music.stop();
        });

        //soundeffects
        this.sound.add("chew");
        this.sound.add("roekoe");

        // Create map and tileset from loaded json and image
        const map = this.make.tilemap({ key: "map-city" });

        // Set bounds width to the width of the loaded map
        this.physics.world.bounds.width = map.widthInPixels;

        // Add background layers with parallax effect
        this.backgroundLayers.push(
            new BackgroundLayer(this, "city-sky"),
            new BackgroundLayer(this, "house1", 232, 2.5),
            new BackgroundLayer(this, "house2", 200, 2),
            new BackgroundLayer(this, "house3", 223, 1.5)
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

        this.obstacles = this.obstacles.concat(
            map.createFromObjects("Obstacles", 3, { key: "cola-can" }),
            map.createFromObjects("Obstacles", 1, { key: "alcohol" })
        );

        for (const obstacle of this.obstacles) {
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
        this.sound.play("chew");
        this.registry.values.score += 100
    }

    private getDamage(player: Player, obstacle: Phaser.Physics.Arcade.Sprite) {
        obstacle.destroy();
        this.player.lives--;
        this.sound.play("roekoe");
        this.registry.values.score -= 600
    }

    private destroyOb(player: Player, obstacle: Phaser.Physics.Arcade.Sprite) {
        obstacle.destroy(); }

    private finish() {
        this.scene.start("GameScene2");
    }

    update() {
        this.registry.values.score += this.player.body.velocity.x/100
        if (this.registry.values.score < 0) {
            this.registry.values.score = 0
        }

        this.player.update();
        // Call update function for all backgroundlayers
        for (const backgroundLayer of this.backgroundLayers) {
            backgroundLayer.update(this.player.body.velocity.x);
        }
        
        //console.log(this.player.corn);
        if (this.player.corn){
            for (const obstacle of this.obstacles) {
            
                this.physics.add.overlap(this.player.corn, obstacle, this.destroyOb, null, this);
            }
        }
        
    }

}
