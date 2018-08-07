import { EngineObject } from "./object";

export class Scene {
    width: number;
    elements: EngineObject[] = [];
    scrollPosition: number;
}