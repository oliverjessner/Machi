import { Building } from './building.js';

export class Spring extends Building {
    public readonly url = 'spring.png';
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
