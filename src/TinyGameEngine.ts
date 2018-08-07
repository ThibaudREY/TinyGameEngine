import { Canvas } from "./canvas";
import { Config } from "./Util/config";
import { Scene } from "./Scene";
import { EngineObject } from "./object";

export class TinyGameEngine {
    canvas: Canvas;
    currentScene: Scene;
    // physics: Physics;

    init() {
        this.canvas = new Canvas();
        this.canvas.init().fullScreen();

        let ground = new EngineObject();
        ground.height = 100;
        ground.width = this.canvas.width();
        ground.x = 0;
        ground.y = window.innerHeight - 100;
        ground.skin = "../assets/ground.png";

        this.currentScene = new Scene();
        this.currentScene.elements.push(ground);

        this.start();
    }

    start() {
        setInterval(() => {
            // this.currentScene = this.physics.process(this.currentScene);
            this.canvas.render(this.currentScene);
        }, 1000 / Config.framerate);
    }
}

