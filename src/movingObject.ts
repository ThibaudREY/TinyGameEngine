import {EngineObject} from "./object";
import { Config } from "./Util/config";

export class MovingOject extends  EngineObject {


    /**
     * move to the left
     * position = position + speed * Dt
     * @param direction -1 left +1 right vector
     */
    move(direction: number) {
        this.x += direction * this.vx * (1 / Config.framerate);
    }
}