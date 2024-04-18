import Building from './building.js';
export default class Spring extends Building {
    maxWater = Math.floor(Math.random() * 51) + 50;
    name = 'spring';
    constructor(cellNr) {
        super(cellNr);
    }
    produce() {
        if (this.maxWater === 0) {
            return { name: 'water', amount: 0, emoji: '💧' };
        }
        this.maxWater--;
        return { name: 'water', amount: 1, emoji: '💧' };
    }
}
