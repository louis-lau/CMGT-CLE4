export class FinishScene extends Phaser.Scene {
    constructor() {
        super({ key: "FinishScene" });
    }

    init(): void {}

    preload(): void {}

    create(): void {
        this.time.delayedCall(3000, this.playMusic, [], this);

        this.add
            .text(240, 130, "WINNER!", { fontFamily: "Arial Black", fontSize: 60, color: "yellow" })
            .setOrigin(0.5)
            .setStroke("black", 3);
        this.add
            .text(240, 200, "End of Beta.\nClick to start again", { fontFamily: "Arial Black", fontSize: 20, color: "yellow" })
            .setOrigin(0.5)
            .setStroke("black", 1);

        this.input.once("pointerdown", pointer => {
            this.scene.start("GameScene");
        });
    }

    private playMusic() {
        const music = this.sound.add("party", { loop: true });
        music.play();
        this.events.on("shutdown", function() {
            music.stop();
        });
    }
}
