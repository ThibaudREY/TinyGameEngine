export class EngineObject {

    // Position in scene on X-axis
    x: number;

    // Position in scene on Y-Axis
    y: number;

    // X-Axis Friction: speed loss at each frame
    cx: number;

    // Y-Axis Friction: speed loss at each frame
    cy: number;

    // Object mask width
    width: number;

    // Object mask height
    height: number;

    // Skin filepath
    skin: string;

    // X-Axis speed
    vx: number;

    // Y-Axis speed
    vy: number;

    // X-Axis Inertia: distance allowed to move
    ix: number;

    // Y-Axis Inertia: distance allowed to move
    iy: number;

    // Unique identifier, needed to compute collisions
    hash: string;

    updateHash() {
        this.hash = `${this.x}:${this.y}:${this.cx}:${this.cy}:${this.width}:${this.height}:${this.skin}:${this.vx}:${this.vy}:${this.ix}:${this.iy}`;
    }

    static equals(a: EngineObject, b: EngineObject) {
        return a.hash === b.hash;
    }
}