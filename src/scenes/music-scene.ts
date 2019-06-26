import { Game } from "../app";

export class Music extends Phaser.Scene {
    constructor() {
        super({ key: "Music" })
    }

    create() {
        const music = this.sound.add("spacetheme", { loop: true })
        music.play()
        this.scene.start("StartScene")
    }
}
