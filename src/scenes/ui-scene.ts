export class UIScene extends Phaser.Scene {

    private scoreText: Phaser.GameObjects.Text

    constructor(key:string) {
        super(key)
    }

    create() {
        this.scoreText = this.add.text(this.cameras.main.displayWidth - 10, 10, "Score:").setOrigin(1, 0)
    }

    update(){
        this.scoreText.text = `Score: ${Math.round(this.registry.values.score)}`
    }
}