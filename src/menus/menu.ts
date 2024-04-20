export abstract class Menu {
    protected dom: HTMLElement;

    constructor(dom: HTMLElement) {
        this.dom = dom;
    }

    abstract render(): void;
}
