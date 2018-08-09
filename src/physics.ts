import {Scene} from "./Scene";
import {EngineObject} from "./object";

export class Physics {

    process(scene: Scene): Scene {
        let res = new Scene();

        /**
         * This method aims to return a new computed scene out of a current one
         *
         * This is achieved by looping over each element of the current scene, check for collision between objects and compute new values
         */
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
            o.ix = element.ix;
            o.iy = element.iy;

            this.collision(element, scene, (direction: string) => {

                // Rebound with speed loss
                // TODO: Put value in conf
                if (direction === "y") {
                    o.vy = element.vy - o.cy;
                    o.vx = -element.vx * 0.65 + o.cx;
                }

                // Rebound with speed loss
                // TODO: Put value in conf
                if (direction === "x") {
                    o.vx = element.vx - o.cx;
                    o.vy = -element.vy * 0.65 + o.cy;
                }

            });

            // Removing friction coefficient from speed
            o.vx = o.vx - o.cx;
            o.vy = o.vy - o.cy;

            // Removing friction coefficient from inertia
            o.ix = o.ix - o.cx;
            o.iy = o.iy - o.cy;

            // Computing new positions only if inertia is positive
            o.ix > 0 ? o.x = element.x + o.vx : o.x = element.x;
            o.iy > 0 ? o.y = element.y + o.vy : o.y = element.y;


            res.elements.push(o);
        });

        return res;
    }

    /**
     * Call a callback if an object is colliding any other object of a scene
     * @param {EngineObject} element
     * @param {Scene} scene
     * @param collisionCallback
     */
    private collision(element: EngineObject, scene: Scene, collisionCallback: any) {

        // Not checking for collision on not moving objects
        if (element.vx === 0 && element.vy === 0) return;

        // Checking for collision with all objects of scene except the current one
        scene.elements.forEach(e => {
            if (element.hash !== e.hash) {
                if (element.x <= e.x + e.width &&
                    element.x + element.width >= e.x &&
                    element.y <= e.y + e.height &&
                    element.height + element.y >= e.y) {

                    // TODO: Find a way to get the collision direction
                    collisionCallback("x");
                }
            }
        });
    }
}