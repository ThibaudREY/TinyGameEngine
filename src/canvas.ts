import { window } from "./Util/window";

export class Canvas {

    canvas: HTMLCanvasElement;

    init() {
        this.canvas = new HTMLCanvasElement();
        this.canvas.setAttribute("id", "TinyGameEngineCanvas");
        document.body.insertAdjacentElement("afterbegin", this.canvas);
    }

    fullScreen() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
}