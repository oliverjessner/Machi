import { Building } from './building.js';

export class Tent extends Building {
    public readonly url = 'tent.png';
    public readonly produceNeeds: BuildingNeed[] = [];

    public produce(): void {}
}
