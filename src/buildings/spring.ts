import { Building } from './building.js';

export class Spring extends Building {
    public readonly url = 'spring.png';

    public gift(): BuildingNeed[] {
        return [
            {
                name: 'water',
                amount: 1,
            },
        ];
    }
}
