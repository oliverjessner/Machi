import { BuildingNeed } from '../buildingMenu.js';
import Building from './building.js';

export default class Tent extends Building {
    private maxSeeds: number = Math.floor(Math.random() * 51) + 50;
    public name = 'tent';

    constructor(cellNr: number) {
        super(cellNr);
    }

    public produce(): BuildingNeed {
        if (this.maxSeeds === 0) {
            return { name: 'seeds', amount: 0, emoji: '🌱' };
        }

        this.maxSeeds--;
        return { name: 'seeds', amount: 1, emoji: '🌱' };
    }
}
