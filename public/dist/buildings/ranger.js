import Building from './building.js';
export default class Ranger extends Building {
    maxTrees = Math.floor(Math.random() * 26) + 25;
    name = 'ranger';
    constructor(cellNr) {
        super(cellNr);
    }
    produce() {
        return { name: 'wood', amount: 0, emoji: '🌲' };
    }
    create(recourses) {
        if (this.maxTrees === 0) {
            return false;
        }
        if (recourses.seeds > 1) {
            this.maxTrees--;
            recourses.seeds--;
            return true;
        }
        return false;
    }
}
