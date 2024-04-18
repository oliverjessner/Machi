export default class Timer {
    timer = null;
    fn = () => { };
    time;
    constructor(time) {
        this.time = time * 1000;
    }
    add(fn) {
        this.fn = fn;
    }
    stopTimer() {
        if (this.timer) {
            return clearInterval(this.timer);
        }
    }
    startTimer() {
        this.timer = setInterval(() => {
            return this.fn();
        }, this.time);
    }
}
