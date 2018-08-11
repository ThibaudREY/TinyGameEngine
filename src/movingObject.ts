import {EngineObject} from "./object";
import { Config } from "./utils/config";

export class MovingObject extends  EngineObject {

    onGround: boolean;
    jumpBoost: number;

    constructor() {
        super();
    }

    /**
     * simple method to jump
     * apply a boost by changing vertical velocity
     */
    jump() {
        // jump only if the object touch the ground
        if (this.onGround) {
            // apply boost
            this.vy = -this.jumpBoost;
        }
    }

    /**
     * move to the left
     * position = position + speed * Dt
     * @param direction -1 left +1 right vector
     */
    move(direction: number) {
        this.x += direction * this.vx * (1 / Config.framerate);
    }
}