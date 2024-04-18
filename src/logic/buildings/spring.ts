import { BuildingNeed } from '../buildingMenu.js';
import Building from './building.js';

export default class Spring extends Building {
    private maxWater: number = Math.floor(Math.random() * 51) + 50;
    public name = 'spring';

    constructor(cellNr: number) {
        super(cellNr);
    }

    public produce(): BuildingNeed {
        if (this.maxWater === 0) {
            return { name: 'water' as const, amount: 0, emoji: '💧' };
        }

        this.maxWater--;
        return { name: 'water' as const, amount: 1, emoji: '💧' };
    }
}
