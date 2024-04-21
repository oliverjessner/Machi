import { Building } from './building.js';

export class Spring extends Building {
    public readonly urls = ['spring-1.png'];
    public readonly produceNeeds: BuildingNeed[] = [];

    public produce() {
        return [
            {
                name: 'water',
                amount: 1,
            },
        ];
    }
}
