import { Building } from './building.js';
export class Ranger extends Building {
    urls = ['ranger.png'];
    produceNeeds = [
        {
            name: 'seeds',
            amount: 1,
        },
    ];
    produce(tiles, buildingTile) {
        const freeTile = this.getFreeTiles(tiles, buildingTile);
        if (freeTile) {
            freeTile.addTree();
            return true;
        }
        return false;
    }
}
