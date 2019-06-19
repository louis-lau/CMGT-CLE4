import { Player } from "../objects/player";
import { BackgroundLayer } from "../objects/background-layer";

export class GameScene2 extends Phaser.Scene {
    private player: Player;
    private backgroundLayers: Array<BackgroundLayer> = [];
    private obstacles = [];

    constructor() {
        super({ key: "GameScene2" });
    }

    init(): void {}

    create(): void {
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
        const map = this.make.tilemap({ key: "map-city2" });

        // Set bounds width to the width of the loaded map
        this.physics.world.bounds.width = map.widthInPixels;

        // Add background layers with parallax effect
        this.backgroundLayers.push(
            new BackgroundLayer(this, "city-sky"),
            new BackgroundLayer(this, "flat3", 0, 2.5),
            new BackgroundLayer(this, "flat", 115, 2),
            new BackgroundLayer(this, "flat2", 223, 1.5)
        );

        this.player = new Player(this);

        let foods = [];
        foods = foods.concat(
            map.createFromObjects("Food", 1, { key: "chocolate" }),
            map.createFromObjects("Food", 5, { key: "fry" }),
            map.createFromObjects("Food", 4, { key: "fries" })
        );

        for (const food of foods) {
            this.physics.add.existing(food);
            this.physics.add.overlap(this.player, food, this.collectFood, null, this);
        }

        this.obstacles = this.obstacles.concat(
            map.createFromObjects("Obstacles", 2, { key: "cola-can" }),
            map.createFromObjects("Obstacles", 3, { key: "alcohol" }),
            map.createFromObjects("Obstacles", 7, { key: "sigaret" })
        );

        for (const obstacle of this.obstacles) {
            this.physics.add.existing(obstacle);
            this.physics.add.overlap(this.player, obstacle, this.getDamage, null, this);
        }

        let finishline = map.createFromObjects("Finish", 8, { key: "finishline" })[0]
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
    }

    private getDamage(player: Player, obstacle: Phaser.Physics.Arcade.Sprite) {
        obstacle.destroy();
        this.player.lives--;
        this.sound.play("roekoe");
    }

    private destroyOb(corn : Phaser.Physics.Arcade.Sprite, obstacle: Phaser.Physics.Arcade.Sprite) {
        obstacle.destroy();
        corn.destroy();
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
        
        //console.log(this.player.corn);
        if (this.player.corn){
            for (const obstacle of this.obstacles) {
            
                this.physics.add.overlap(this.player.corn, obstacle, this.destroyOb, null, this);
            }
        }
        
    }

}
