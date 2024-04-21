import { Building } from './building.js';
export class Spring extends Building {
    url = 'spring.png';
    produceNeeds = [];
    produce() {
        return [
            {
                name: 'water',
                amount: 1,
            },
        ];
    }
}
