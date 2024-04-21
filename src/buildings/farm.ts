import { Building } from './building.js';
import { Tile } from '../tiles/tile.js';

export class Farm extends Building {
    public readonly hasFence = true;
    public readonly fence = 'wood';
    public readonly urls = ['farm.png'];
    public readonly produceNeeds: BuildingNeed[] = [
        {
            name: 'seeds',
            amount: 1,
        },
        {
            name: 'water',
            amount: 1,
        },
    ];

    public produce(tiles: Tile[][], buildingTile: Tile): any {
        const freeTile = this.getFreeTiles(tiles, buildingTile);

        if (freeTile) {
            freeTile.addPumpkin();
            return true;
        }

        return false;
    }
}
