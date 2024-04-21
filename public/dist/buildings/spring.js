import { Building } from './building.js';
export class Spring extends Building {
    urls = ['spring-1.png'];
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
