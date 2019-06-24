import { UIScene } from "../scenes/ui-scene";
import { Game } from "../app";
import { Arcade } from "../utils/arcade/arcade";

export class StartScene extends Phaser.Scene {
    private arcade  : Arcade
    constructor() {
        super({ key: "StartScene" });
    }

    init(): void {}

    preload(): void {}

    create(): void {

        let g = this.game as Game
        this.arcade = g.Arcade

        this.registry.set("score", 0);
        this.add
            .text(245, 130, "Schijt Duif", { fontFamily: "Arial Black", fontSize: 60, color: "white" })
            .setOrigin(0.5)
            .setStroke("black", 3);
        this.add
            .text(245, 180, "Click to start", { fontFamily: "Arial Black", fontSize: 20, color: "white" })
            .setOrigin(0.5)
            .setStroke("black", 1);

        this.input.once("pointerdown", pointer => {
            this.scene.start("Level1Scene");

            // Only start UI scene if it's not already active
            if (!this.scene.isActive("UIScene")) {
                this.scene.add("UIScene", new UIScene("UIScene"), true);
            }
        });
    }

    update() {
        // console.log(this.arcade.Joysticks)
        for (let joystick of this.arcade.Joysticks) {
            joystick.update()
        }
    }
}
