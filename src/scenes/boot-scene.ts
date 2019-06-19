export class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: "BootScene" });
    }

    init() {}

    preload(): void {
        this.load.image("green-shit", require("../assets/img/green-shit.png"));
        this.load.image("parrot-pigeon", require("../assets/img/parrot-pigeon.png"));
        this.load.image("pigeon", require("../assets/img/pigeon.png"));
        this.load.image("flappybird", require("../assets/img/flappybird.png"));
        this.load.image("rasta-pigeon", require("../assets/img/rasta-pigeon.png"));
        this.load.image("white-dove", require("../assets/img/whitedove.png"))
        this.load.image("white-shit", require("../assets/img/white-shit.png"));
        this.load.image("city-sky", require("../assets/img/city-sky.png"));
        this.load.image("flat", require("../assets/img/flat.png"));
        this.load.image("flat2", require("../assets/img/flat2.png"));
        this.load.image("flat3", require("../assets/img/flat3.png"));
        this.load.image("house1", require("../assets/img/house1.png"));
        this.load.image("house2", require("../assets/img/house2.png"));
        this.load.image("house3", require("../assets/img/house3.png"));
        this.load.image("alcohol", require("../assets/img/alcohol.png"));
        this.load.image("chocolate", require("../assets/img/chocolate.png"));
        this.load.image("cola-can", require("../assets/img/cola-can.png"));
        this.load.image("fries", require("../assets/img/fries.png"));
        this.load.image("fry", require("../assets/img/fry.png"));
        this.load.image("sigaret", require("../assets/img/peuk.png"))
        this.load.image("finishline", require("../assets/img/finishline.png"));
        this.load.image("corn", require("../assets/img/corn.png"));
        this.load.tilemapTiledJSON("map-city", require("../assets/maps/city.json"));
        this.load.tilemapTiledJSON("map-city2", require("../assets/maps/city2.json"));

        //audio files
        this.load.audio("spacetheme", [require("../assets/audio/spacetheme.mp3"), require("../assets/audio/spacetheme.ogg")]);
        this.load.audio("party", [require("../assets/audio/party.mp3")]);
        this.load.audio("chew", require("../assets/audio/Bite.mp3"));
        this.load.audio("roekoe", require("../assets/audio/Squawk.mp3"));


        this.load.on("complete", () => {
            console.log("everything is loaded");
            this.scene.start("StartScene");
        });
    }
}
