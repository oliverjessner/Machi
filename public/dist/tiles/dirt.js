import { NonWaterTile } from './nonWaterTile.js';
import { randomFromTo } from '../random.js';
export class Dirt extends NonWaterTile {
    constructor(column, row, tileNr, dom) {
        const randomBetween1and3 = randomFromTo(1, 3);
        super('dirt', column, row, tileNr, dom);
        dom.classList.add('dirt-' + randomBetween1and3);
    }
}
