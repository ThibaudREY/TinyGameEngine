import { Canvas } from "./canvas";

export class TinyGameEngine {
    canvas: Canvas;

    init() {
        this.canvas = new Canvas();
        this.canvas.fullScreen();
    }
}

