export default class Timer {
    private timer: ReturnType<typeof setInterval> | null = null;
    private fn: Function = () => {};
    private time: number;

    constructor(time: number) {
        this.time = time * 1000;
    }

    public add(fn: Function) {
        this.fn = fn;
    }

    public stopTimer(): void {
        if (this.timer) {
            return clearInterval(this.timer);
        }
    }

    public startTimer(): void {
        this.timer = setInterval(() => {
            return this.fn();
        }, this.time);
    }
}
