import { Building } from './building.js';

export class Ranger extends Building {
    public readonly url = 'ranger.png';
    private produceNeeds = {
        seeds: 1,
    };

    public produce(): void {
        console.log('Producing Trees');
    }
}
