import { Tile } from '../tiles/tile.js';
import { Building } from './building.js';

export class Mine extends Building {
    public readonly urls = ['mine.png'];
    public readonly produceNeeds: BuildingNeed[] = [
        {
            name: 'food',
            amount: 1,
        },
    ];

    public produce(tiles: Tile[][], buildingTile: Tile): any {
        const freeTile = this.getFreeTiles(tiles, buildingTile);

        if (freeTile) {
            freeTile.addStone();
            return true;
        }

        return false;
    }
}
