import { Tile } from './tile.js';

export abstract class NonWaterTile extends Tile {
    public addStone(): void {
        const style = getComputedStyle(this.dom).backgroundImage;

        this.dom.style.backgroundImage = `url(/assets/imgs/tiles/stones/stone.png),${style}`;
        this.isEmpty = false;
        this.recourses.push('stone');
    }

    public removeStone(): void {
        this.dom.style.backgroundImage = '';
        this.isEmpty = true;
        this.recourses = this.recourses.filter(recourse => recourse !== 'stone');
    }
}
