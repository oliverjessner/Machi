import Dirt from './dirt.js';
export default class river extends Dirt {
    constructor(cellNr, row, column, dom, level) {
        const style = getComputedStyle(dom).backgroundImage;
        super(cellNr, row, column, dom);
        this.type = 'river';
        dom.style.backgroundImage = '';
        dom.style.backgroundImage = `url(/assets/imgs/tiles/river/river_${level}.png), ${style}`;
    }
}
