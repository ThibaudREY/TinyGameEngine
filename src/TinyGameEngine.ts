import {Canvas} from "./canvas";
import {Config} from "./utils/config";
import {Scene} from "./scene";
import {EngineObject} from "./object";
import {Physics} from "./physics";
import {Controls} from "./controls";
import {MovingObject} from "./movingObject";

export class TinyGameEngine {
    private canvas: Canvas;
    private currentFrame: Scene;
    private nextFrame: Scene;
    private physics: Physics = new Physics();
    private controls: Controls = new Controls();

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

        let block1 = new MovingObject();
        block1.height = 10;
        block1.width = 10;
        block1.x = 30;
        block1.y = 300;
        block1.onGround = true;
        block1.jumpBoost = 10;
        block1.skin = "../assets/block1.png";
        block1.vx = 5;
        block1.vy = -5;
        block1.cx = 0.01;
        block1.cy = -1;
        block1.ix = 1;
        block1.iy = 10;
        block1.updateHash();

        let block2 = new MovingObject();
        block2.height = 40;
        block2.width = 40;
        block2.x = 1000;
        block2.y = 300;
        block2.skin = "../assets/block2.png";
        block2.vx = -5;
        block2.vy = -5;
        block2.cx = 0.01;
        block2.cy = -1;
        block2.ix = 1;
        block2.iy = 10;
        block2.updateHash();

        // test
        document.addEventListener("onmousedown",    block1.jump,    false);

        /**this.controls.addAction("Space", () => {
            // <Jumper>this.currentFrame.elements.find(o => o.hash === block.hash).jump();
        });
        this.controls.start();*/

        this.currentFrame = new Scene();
        this.currentFrame.elements.push(block1);
        this.currentFrame.elements.push(block2);
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