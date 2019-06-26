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

        this.add.image(0, 0, "title-screen").setOrigin(0, 0)

        let startGame = () => this.startGame()
        document.addEventListener("buttonPressed", startGame)
        this.events.on("shutdown", () => document.removeEventListener("buttonPressed", startGame))

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
