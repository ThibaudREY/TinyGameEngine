import { window } from "./Util/window";
import { Scene } from "./Scene";
import {EngineObject} from "./object";

export class Canvas {

    canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    init(): Canvas {
        this.canvas = <HTMLCanvasElement>(document.createElement("canvas"));
        this.canvas.setAttribute("id", "TinyGameEngineCanvas");
        document.body.appendChild(this.canvas);

        this.context = this.canvas.getContext("2d");

        return this;
    }

    fullScreen() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    // TODO: Pass current AND next frame to move instead of redrawing
    // TODO: redraw only if object moved
    render(scene: Scene) {
        scene.elements.forEach(element => {
            this.draw(element);
        });
    }

    private draw(element: EngineObject) {

        let img = document.createElement("img");
        img.setAttribute("src", element.skin);
        img.setAttribute("style", `height:${element.height}px;width:${element.width}px;`);
        document.body.appendChild(img);

        this.context.drawImage(img, element.x, element.y, element.width, element.height);
        img.remove();
    }

    width(): number {
        return this.canvas.width;
    }

}