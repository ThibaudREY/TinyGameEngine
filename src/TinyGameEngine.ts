import { Canvas } from "./canvas";
import { Config } from "./Util/config";
import { Scene } from "./Scene";
import { EngineObject } from "./object";
import { Physics } from "./physics";

export class TinyGameEngine {
    private canvas: Canvas;
    private currentFrame: Scene;
    private nextFrame: Scene;
    private physics: Physics = new Physics();

    init() {
        this.canvas = new Canvas();
        this.canvas.init().fullScreen();

        let ground = new EngineObject();
        ground.height = 100;
        ground.width = this.canvas.width();
        ground.x = 0;
        ground.y = this.canvas.height() - ground.height;
        ground.skin = "../assets/ground.png";
        ground.vx = 0;
        ground.vy = 0;
        ground.cx = 0;
        ground.cy = 0;
        ground.updateHash();

        let block = new  EngineObject();
        block.height = 10;
        block.width = 10;
        block.x = 60;
        block.y = 400;
        block.skin = "../assets/block.png";
        block.vx = 5;
        block.vy = 5;
        block.cx = 0.01;
        block.cy = -2;
        block.updateHash();

        this.currentFrame = new Scene();
        this.currentFrame.elements.push(block);
        this.currentFrame.elements.push(ground);

        this.start();
    }

    start() {
        setInterval(() => {
            this.nextFrame = this.physics.process(this.currentFrame);
            this.canvas.render(this.currentFrame, this.nextFrame);
            this.currentFrame = this.nextFrame;
        }, 1000 / Config.framerate);
    }
}

