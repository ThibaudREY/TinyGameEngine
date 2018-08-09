export class Controls {

    actions: SimpleMap = {};

    addAction(key: any, callback: any) {
        this.actions[key] = callback;
    }

    start() {
        document.addEventListener("keydown", e => this.process(e));
    }

    process(e: KeyboardEvent) {
        this.actions[e.code]();
    }

}