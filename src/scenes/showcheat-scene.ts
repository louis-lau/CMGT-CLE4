import { Game } from "../app";

export class ShowCheat extends Phaser.Scene {
    constructor() {
        super({ key: "ShowCheat" })
    }

    create() {
        this.add.image(0, 0, "cheat-screen").setOrigin(0, 0)
        const cheats = this.registry.values.cheats

        const randomCheat = cheats[Math.floor(Math.random() * cheats.length)]
        console.log(randomCheat.code)
        this.add.text(245, 220, randomCheat.code, { fontSize: 60, color: "black" }).setOrigin(0.5)
        this.add.text(245, 40, "This only works with a controller!", { fontSize: 20, color: "red" }).setOrigin(0.5)

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

    private startGame() {
        this.scene.start("StartScene")
    }
}
