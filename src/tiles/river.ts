import { Tile } from './tile.js';

export class River extends Tile {
    private riverLevel: string;

    constructor(column: number, row: number, tileNr: number, dom: HTMLElement, level: string) {
        const style = getComputedStyle(dom).backgroundImage;

        super('river', column, row, tileNr, dom);
        this.riverLevel = level;

        dom.classList.add('dirt');
        dom.style.backgroundImage = `url(/assets/imgs/tiles/river/river_${level}.png), ${style}`;
    }
}
