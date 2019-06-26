import { Game } from "../app"

export class EndScene extends Phaser.Scene {
    constructor() {
        super({ key: "EndScene" })
    }

    init(): void {}

    preload(): void {}

    create(): void {
        // change this to a nice game over image

        this.add.tileSprite(0, 0, 480, 270, "city-sky").setOrigin(0, 0)

        this.add
            .text(245, 130, "Birb is ded", { fontSize: 60, color: "red" })
            .setOrigin(0.5)
            .setStroke("black", 3)
        this.add
            .text(245, 170, "Press any button to show a cheat code", { fontSize: 20, color: "red" })
            .setOrigin(0.5)
            .setStroke("black", 1)

        this.input.once("pointerdown", pointer => {
            this.startGame()
        })

        let startGame = () => this.startGame()
        document.addEventListener("buttonPressed", startGame)
        this.events.on("shutdown", () => document.removeEventListener("buttonPressed", startGame))
    }

    update() {
        // console.log(this.arcade.Joysticks)
        for (let joystick of (this.game as Game).Arcade.Joysticks) {
            joystick.update()
        }
    }

    startGame() {
        this.scene.start("ShowCheat")
    }
}
