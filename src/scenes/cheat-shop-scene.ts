import { Game } from "../app";

export class CheatShop extends Phaser.Scene {
    constructor() {
        super({ key: "CheatShop" })
    }

    create() {
        this.add.image(0, 0, "cheat-shop").setOrigin(0, 0)

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
        this.scene.start("ShowCheat")
    }
}