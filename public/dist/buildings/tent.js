import Building from './building.js';
export default class Tent extends Building {
    maxSeeds = Math.floor(Math.random() * 51) + 50;
    name = 'tent';
    constructor(cellNr) {
        super(cellNr);
    }
    produce() {
        if (this.maxSeeds === 0) {
            return { name: 'seeds', amount: 0, emoji: '🌱' };
        }
        this.maxSeeds--;
        return { name: 'seeds', amount: 1, emoji: '🌱' };
    }
}
