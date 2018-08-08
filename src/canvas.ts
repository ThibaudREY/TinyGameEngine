import {window} from "./Util/window";
import {Scene} from "./Scene";
import {EngineObject} from "./object";

export class Canvas {

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private drawn: boolean = false;
    private rendered: EngineObject[] = [];


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

    render(current: Scene, next: Scene) {
        this.getChanges(current, next, (element: EngineObject) => {
            // TODO: clearRect on accelerated element and force redrawing on fixed element if a cleared area belongs to them
            this.draw(element);
        });
    }


    private draw(element: EngineObject) {

        let img = document.createElement("img");
        img.setAttribute("src", element.skin);
        img.setAttribute("style", `height:${element.height}px;width:${element.width}px;`);
        document.body.appendChild(img);
        img.onload = () => {
            this.context.drawImage(img, element.x, element.y, element.width, element.height);
            img.remove();
        };

    }

    width(): number {
        return this.canvas.width;
    }

    private getChanges(current: Scene, next: Scene, callback: any) {
        current.elements.forEach((current, key) => {
            if (this.rendered.every(o => !EngineObject.equals(o, current))) {
                callback(current);
                this.rendered.push(current);
            } else if (
                current.x !== next.elements[key].x ||
                current.y !== next.elements[key].y
            ) {
                callback(current);
            }
        });
    }

    height(): number {
        return this.canvas.height;
    }
}