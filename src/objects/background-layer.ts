export class BackgroundLayer extends Phaser.GameObjects.TileSprite {
    private _speed: number;

    /**
     * Create a new repeating background, can be parallax.
     *
     * @param scene The Scene to which this Game Object belongs. A Game Object can only belong to one Scene at a time.
     * @param texture What texture to use for the background.
     * @param yOffset Optional distance from top of texture to top of scene.
     * @param speed Optional speed of the parralax effect.
     */
    constructor(scene: Phaser.Scene, texture: string, yOffset = 0, speed = 0) {
        super(scene, 0, yOffset, scene.physics.world.bounds.width, scene.physics.world.bounds.height, texture);

        this.scene.add.existing(this);
        this.setOrigin(0);
        this._speed = speed;
    }

    /**
     * @param currentVelocity Optionally pass the current X velocity of the player to adjust parallax speed based on velocity
     */
    public update(currentVelocity = 200) {
        this.tilePositionX -= (currentVelocity / 200) * this.speed;
    }

    public get speed() {
        return this._speed;
    }

    public set speed(newSpeed: number) {
        this._speed = newSpeed;
    }
}
