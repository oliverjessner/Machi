import { BuildingNeed } from '../buildingMenu.js';
import { Recourses } from '../recourses.js';

export default abstract class Building {
    private cellNr: number;
    public name = 'building';

    constructor(cellNr: number) {
        this.cellNr = cellNr;
    }

    abstract produce(): BuildingNeed;
    public create(recourses: Recourses): boolean {
        return false;
    }
}
