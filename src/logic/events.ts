import Info from './info.js';
import { Recourses } from './recourses.js';
import Playground from './playground.js';

export default class Events {
    private recourses: Recourses;

    constructor(recourses: Recourses) {
        this.recourses = recourses;
    }

    public checkEvent(playground: Playground): void {
        if (playground.isAllDirtGone()) {
            console.log('All dirt is gone');
        }
        if (playground.areAllTreesCutted()) {
            console.log('All trees are cutted');
        }
        if (playground.areAllStonesRemoved()) {
            console.log('All stones are removed');
        }
    }
}
