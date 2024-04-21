import { Building } from './building.js';

export class Tent extends Building {
    public readonly urls = ['tent-1.png', 'tent-2.png', 'tent-3.png', 'tent-4.png'];
    public readonly produceNeeds: BuildingNeed[] = [];

    public produce(): void {}
}
