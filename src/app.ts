import "phaser";
import { BootScene } from "./scenes/boot-scene";
import { StartScene } from "./scenes/start-scene";
import { EndScene } from "./scenes/end-scene";
import { FinishScene } from "./scenes/finish-scene";
import { UIScene } from "./scenes/ui-scene"
import { Level1Scene } from "./scenes/level1-scene";
import { Level2Scene } from "./scenes/level2-scene";

const config: Phaser.Types.Core.GameConfig = {
    width: 480,
    height: 270,
    scale: {
        mode: Phaser.Scale.ScaleModes.FIT,
        autoCenter: Phaser.Scale.Center.CENTER_BOTH
    },
    parent: "game",
    resolution: window.devicePixelRatio,
    // @ts-ignore Issue with Typescript definitions in Phaser 3.17.0
    scene: [BootScene, StartScene, EndScene, FinishScene, UIScene, Level1Scene, Level2Scene],

    input: {
        keyboard: true
    },
    //audio
    audio: {
        disableWebAudio: true
    },

    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    render: { pixelArt: true }
};

export class Game extends Phaser.Game {
    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config);
    }
}

window.addEventListener("load", () => new Game(config));
