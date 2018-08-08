import {Scene} from "./Scene";
import {EngineObject} from "./object";

export class Physics {

    process(scene: Scene): Scene {
        let res = new Scene();

        // TODO: check for collisions
        scene.elements.forEach(element => {
            let o = new EngineObject();

            // Immutable values
            o.height = element.height;
            o.hash = element.hash;
            o.width = element.width;
            o.cx = element.cx;
            o.cy = element.cy;
            o.skin = element.skin;
            o.vx = element.vx;
            o.vy = element.vy;

            this.collision(element, scene, (direction: string) => {
                // Colision
                if (direction === "y") {
                    o.vy = element.vy - o.cy;
                    o.vx = -element.vx + o.cx;
                }

                if (direction === "x") {
                    o.vx = element.vx - o.cx;
                    o.vy = -element.vy + o.cy;
                }

                // TODO: Find which side has a hit a make a rebound
            });

            o.vx = o.vx - o.cx;
            o.vy = o.vy - o.cy;

            o.x = element.x + o.vx;
            o.y = element.y + o.vy;
            res.elements.push(o);
        });

        return res;
    }

    private collision(element: EngineObject, scene: Scene, collisionCallback: any) {

        if (element.vx === 0 && element.vy === 0) return;

        scene.elements.forEach(e => {
            if (element.hash !== e.hash) {
                if (element.x <= e.x + e.width &&
                    element.x + element.width >= e.x &&
                    element.y <= e.y + e.height &&
                    element.height + element.y >= e.y) {

                    collisionCallback("x");
                }
            }
        });
    }
}