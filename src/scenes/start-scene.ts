export class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: "StartScene" });
    }

    init(): void {}

    preload(): void {}

    create(): void {
        this.registry.set("score", 0)
        this.add
            .text(245, 130, "Schijt Duif", { fontFamily: "Arial Black", fontSize: 60, color: "white" })
            .setOrigin(0.5)
            .setStroke("black", 3);
        this.add
            .text(245, 180, "Click to start", { fontFamily: "Arial Black", fontSize: 20, color: "white" })
            .setOrigin(0.5)
            .setStroke("black", 1);

        this.input.once("pointerdown", pointer => {
            this.scene.start("GameScene");
        });
    }
}
      