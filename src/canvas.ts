import { window } from "./Util/window";

export class Canvas {

    canvas: HTMLCanvasElement;

    init(): Canvas {
        this.canvas = <HTMLCanvasElement>(document.createElement("canvas"));
        this.canvas.setAttribute("id", "TinyGameEngineCanvas");
        document.body.appendChild(this.canvas);

        return this;
    }

    fullScreen() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
}