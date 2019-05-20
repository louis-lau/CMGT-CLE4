import { Scene } from "phaser";

export class BootScene extends Phaser.Scene {

    private graphics: Phaser.GameObjects.Graphics

    constructor() {
        super({ key: "BootScene" })
    }

    init(){
    }

    preload(): void {
        this.load.image('alcohol', require('../assets/img/alcohol.png'))
        this.load.image('chocolate', require('../assets/img/chocolate.png'))
        this.load.image('cola-can', require('../assets/img/cola-can.png'))
        this.load.image('fries', require('../assets/img/fries.png'))
        this.load.image('fry', require('../assets/img/fry.png'))
        this.load.image('green-shit', require('../assets/img/green-shit.png'))
        this.load.image('parrot-pigeon', require('../assets/img/parrot-pigeon.png'))
        this.load.image('pigeon', require('../assets/img/pigeon.png'))
        this.load.image('rasta-pigeon', require('../assets/img/rasta-pigeon.png'))
        this.load.image('white-shit', require('../assets/img/white-shit.png'))

        this.load.on('complete', () => {
            console.log("everything is loaded")
            this.scene.start("StartScene");
        })
    }
}