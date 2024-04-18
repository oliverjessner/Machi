import Building from './building.js';
import { Recourses } from '../recourses.js';
import { BuildingNeed } from '../buildingMenu.js';

export default class Ranger extends Building {
    private maxTrees: number = Math.floor(Math.random() * 26) + 25;
    public name = 'ranger';

    constructor(cellNr: number) {
        super(cellNr);
    }

    public produce(): BuildingNeed {
        return { name: 'wood', amount: 0, emoji: '🌲' };
    }

    public create(recourses: Recourses) {
        if (this.maxTrees === 0) {
            return false;
        }
        if (recourses.seeds > 1) {
            this.maxTrees--;
            recourses.seeds--;
            return true;
        }

        return false;
    }
}
