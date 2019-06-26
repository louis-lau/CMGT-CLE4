import { Player } from "../objects/player"
import { BackgroundLayer } from "../objects/background-layer"
import { Game } from "../app"

export class GameScene extends Phaser.Scene {
    private player: Player
    private backgroundLayers: Array<BackgroundLayer> = []
    private foods: Array<Phaser.GameObjects.Sprite> = []
    private obstacles: Array<Phaser.GameObjects.Sprite> = []
    private nextSceneKey: string
    private currentButtonCombo = ""
    private bullets: Array<Phaser.GameObjects.Sprite> = []
    
    constructor(config: Phaser.Types.Scenes.SettingsConfig) {
        super(config)
    }

    /**
     * Runs create() function of the base game scene, requires the following parameters.
     * @param map Tilemap to base level off of
     * @param music Background music for the level
     * @param backgroundLayers Array of BackgroundLayers, allows for parralax effect
     * @param foods Array of food sprites
     * @param obstacles Array of obstacle sprites
     * @param bullets Array of ammo sprites
     * @param finishline Finish Line sprite
     * @param nextSceneKey Key for the scene that loads when finishing this level
     */
    create(
        map: Phaser.Tilemaps.Tilemap,
        music: Phaser.Sound.BaseSound,
        backgroundLayers: Array<BackgroundLayer>,
        foods: Array<Phaser.GameObjects.Sprite>,
        obstacles: Array<Phaser.GameObjects.Sprite>,
        bullets: Array<Phaser.GameObjects.Sprite>,
        finishline: Phaser.GameObjects.Sprite,
        nextSceneKey: string
    ): void {
        this.backgroundLayers = backgroundLayers
        this.foods = foods
        this.obstacles = obstacles
        this.bullets = bullets
        this.nextSceneKey = nextSceneKey
        this.registry.set("cheats", [
            {
                name: "New look",
                code: "3333",
                execute: () => this.changeCharacter()
            },
            {
                name: "Only speed now",
                code: "4312",
                execute: () => this.player.setDragX(0)
            },
            {
                name: "Turbo Turbo",
                code: "2222",
                execute: () => this.player.setVelocityX(400)
            },
            {
                name: "Tiny birb",
                code: "4213",
                execute: () => this.player.setScale(0.5, 0.5)
            },
            {
                name: "Yo momma",
                code: "4444",
                execute: () => this.player.setScale(2, 2)
            }
        ])

        let buttonCombo = event => this.buttonCombo(event)
        document.addEventListener("buttonPressed", buttonCombo)

        this.events.on("shutdown", () => {
            this.player.killController()
            document.removeEventListener("buttonPressed", buttonCombo)
        })

        //soundeffects
        this.sound.add("chew")
        this.sound.add("roekoe")
        this.sound.add("break")
        this.sound.add("breakfood")
        this.sound.add("corn")

        this.player = new Player(this)

        for (const food of this.foods) {
            this.physics.add.existing(food)
            this.physics.add.overlap(this.player, food, this.collectFood, null, this)
        }
        for (const obstacle of this.obstacles) {
            this.physics.add.existing(obstacle)
            this.physics.add.overlap(this.player, obstacle, this.takeDamage, null, this)
        }

        for (const bullet of this.bullets) {
            this.physics.add.existing(bullet)
            this.physics.add.overlap(this.player, bullet, this.collectAmmo, null, this)
        }

        this.physics.add.existing(finishline)
        this.physics.add.overlap(this.player, finishline, this.finish, null, this)

        // Set camera bounds and start following
        this.cameras.main.setBounds(0, 0, this.physics.world.bounds.width, this.physics.world.bounds.height)
        this.cameras.main.startFollow(this.player, true, undefined, undefined, -175)
    }

    update() {
        this.registry.values.score += this.player.body.velocity.x / 100
        if (this.registry.values.score < 0) {
            this.registry.values.score = 0
        }

        this.player.update()
        // Call update function for all backgroundlayers
        for (const backgroundLayer of this.backgroundLayers) {
            backgroundLayer.update(this.player.body.velocity.x)
        }

        if (this.player.corn) {
            for (const obstacle of this.obstacles) {
                this.physics.add.overlap(this.player.corn, obstacle, this.destroyObject, null, this)
            }
        }

        if (this.player.corn) {
            for (const food of this.foods) {
                this.physics.add.overlap(this.player.corn, food, this.destroyFood, null, this)
            }
        }
    }

    private collectFood(player: Player, food: Phaser.Physics.Arcade.Sprite) {
        food.destroy()
        this.player.accelerate()
        this.sound.play("chew")
        this.registry.values.score += 100
    }

    private takeDamage(player: Player, obstacle: Phaser.Physics.Arcade.Sprite) {
        obstacle.destroy()
        this.player.lives--
        this.sound.play("roekoe")
        this.registry.values.score -= 600
    }

    private collectAmmo(player: Player, bullet: Phaser.Physics.Arcade.Sprite) {
        bullet.destroy()
        this.player.ammo++
        this.sound.play("corn")
        this.registry.values.score += 40
    }

    private destroyObject(corn: Phaser.Physics.Arcade.Sprite, obstacle: Phaser.Physics.Arcade.Sprite) {
        obstacle.destroy()
        corn.destroy()
        this.sound.play("break")
        this.registry.values.score += 90
    }

    private destroyFood(corn: Phaser.Physics.Arcade.Sprite, food: Phaser.Physics.Arcade.Sprite) {
        food.destroy()
        corn.destroy()
        this.sound.play("breakfood")
        this.registry.values.score -= 90
    }

    private finish() {
        this.scene.start(this.nextSceneKey)
    }

    //CHEATS

    private buttonCombo(event: CustomEvent) {
        const eventDetail: string = event.detail
        let comboChar: string
        let PartialMatch = false
        const cheats = this.registry.values.cheats

        // Extract info from joystick0button0 string
        const joystick: number = Number(eventDetail.substr(8, 1))
        const button: number = Number(eventDetail.substr(15, 1))

        if (joystick === 0) {
            // button starts at 0 while cheat code numbers start at 1
            comboChar = (button + 1).toString()
        } else if (joystick === 1) {
            // convert button to letter, 0 = A
            comboChar = String.fromCharCode(65 + button)
        }

        // add character to current button combo
        this.currentButtonCombo += comboChar

        for (const cheat of cheats) {
            if (cheat.code === this.currentButtonCombo) {
                cheat.execute()
            } else if (cheat.code.startsWith(this.currentButtonCombo)) {
                // current key combo matches partially with a cheat
                PartialMatch = true
            }
        }

        if (!PartialMatch) {
            // No partial match found, reset key combo
            this.currentButtonCombo = ""
        }
    }

    private changeCharacter() {
        let randClothes = this.player.texture.key
        // only pick a random skin that's currently not being used
        while (randClothes === this.player.texture.key) {
            let clothes: Array<string> = ["parrot-pigeon", "flappybird", "rasta-pigeon", "white-dove", "pigeon"]
            randClothes = clothes[Math.floor(Math.random() * clothes.length)]
        }
        this.player.setTexture(randClothes)
        this.player.body.setSize(this.player.displayWidth, this.player.displayHeight)
    }
}
