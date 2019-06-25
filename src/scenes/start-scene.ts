import { UIScene } from "../scenes/ui-scene"
import { Game } from "../app"
import { Arcade } from "../utils/arcade/arcade"

export class StartScene extends Phaser.Scene {
    private arcade: Arcade
    constructor() {
        super({ key: "StartScene" })
    }

    init(): void {}

    preload(): void {}

    create(): void {
        this.registry.set("score", 0)
        this.add
            .text(245, 130, "Schijt Duif", { fontFamily: "Arial Black", fontSize: 60, color: "white" })
            .setOrigin(0.5)
            .setStroke("black", 3)
        this.add
            .text(245, 180, "Just mash buttons to start", { fontFamily: "Arial Black", fontSize: 20, color: "white" })
            .setOrigin(0.5)
            .setStroke("black", 1)

        let startGame = () => this.startGame()
        document.addEventListener("joystick0button0", startGame)
        this.events.on("shutdown", () => document.removeEventListener("joystick0button0", startGame))

        this.input.once("pointerdown", pointer => {
            this.scene.start("Level1Scene")

            // Only start UI scene if it's not already active
            if (!this.scene.isActive("UIScene")) {
                this.scene.add("UIScene", new UIScene("UIScene"), true)
            }
        })
    }

    update() {
        // console.log(this.arcade.Joysticks)
        for (let joystick of (this.game as Game).Arcade.Joysticks) {
            joystick.update()
        }
    }

    startGame() {
        this.scene.start("Level1Scene")
        // Only start UI scene if it's not already active
        if (!this.scene.isActive("UIScene")) {
            this.scene.add("UIScene", new UIScene("UIScene"), true)
        }
    }
}
