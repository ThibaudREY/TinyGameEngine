import { Scene } from "./Scene";
import {EngineObject} from "./object";

export class Physics {

    process(scene: Scene): Scene {
        let res = new Scene();

        // TODO: check for collisions
        scene.elements.forEach(element => {
            let o = new EngineObject();
            o.height = element.height;
            o.hash = element.hash;
            o.width = element.width;
            o.cx = element.cx;
            o.cy = element.cy;
            o.skin = element.skin;
            o.x = element.x + element.vx;
            o.y = element.y + element.vy;
            element.vx > 0 ? o.vx = element.vx - element.cx : o.vx = 0;
            element.vy > 0 ? o.vy = element.vy - element.cy : o.vy = 0;

            res.elements.push(o);
        });

        return res;
    }

}