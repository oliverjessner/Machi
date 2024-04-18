export default class Events {
    recourses;
    constructor(recourses) {
        this.recourses = recourses;
    }
    checkEvent(playground) {
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
