export default class Events {
    recourses;
    constructor(recourses) {
        this.recourses = recourses;
    }
    checkEvent(playground) {
        if (playground.isAllDirtGone()) {
            console.log('All dirt is gone! Game over!');
        }
    }
}
