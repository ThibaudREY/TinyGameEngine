export class EngineObject {
    x: number;
    y: number;
    cx: number;
    cy: number;
    width: number;
    height: number;
    skin: string;
    vx: number;
    vy: number;
    ix: number;
    iy: number;

    hash: string;

    updateHash() {
        this.hash = `${this.x}:${this.y}:${this.cx}:${this.cy}:${this.width}:${this.height}:${this.skin}:${this.vx}:${this.vy}:${this.ix}:${this.iy}`;
    }

    static equals(a: EngineObject, b: EngineObject) {
        return a.hash === b.hash;
    }
}