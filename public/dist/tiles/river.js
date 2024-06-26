import { Tile } from './tile.js';
export class River extends Tile {
    riverLevel;
    constructor(column, row, tileNr, dom, level) {
        const style = getComputedStyle(dom).backgroundImage;
        super('river', column, row, tileNr, dom);
        this.riverLevel = level;
        dom.classList.add('dirt');
        dom.style.backgroundImage = `url(/assets/imgs/tiles/river/river_${level}.png), ${style}`;
    }
}
