import {EngineObject} from "./object";

export class Jumper extends  EngineObject {

    jump() {
        this.x = 50;
        this.y = 50;
    }
}