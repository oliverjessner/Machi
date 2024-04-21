import { Grass } from '../tiles/grass.js';
import { Tile } from '../tiles/tile.js';
import { Building } from './building.js';

export class Ranger extends Building {
    public readonly urls = ['ranger.png'];
    public readonly produceNeeds: BuildingNeed[] = [
        {
            name: 'seeds',
            amount: 1,
        },
    ];

    public produce(tiles: Tile[][], buildingTile: Tile) {
        const freeTile = this.getFreeTiles(tiles, buildingTile);

        if (freeTile) {
            freeTile.addTree();
            return true;
        }

        return false;
    }
}
