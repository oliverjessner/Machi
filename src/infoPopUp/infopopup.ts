export class InfoPopUp {
    private dom: HTMLElement = document.querySelector('.info-popup') as HTMLElement;
    private isShown: boolean = false;

    constructor() {
        if (!this.dom) {
            throw new Error('No .info-popup element found');
        }
    }

    public displayInfo(text: string): void {
        if (!this.isShown) {
            console.log(text);
            this.isShown = true;
            this.dom.textContent = text;
            this.dom.classList.remove('hidden');
            this.dom.classList.remove('shrink');

            requestAnimationFrame(() => {
                this.dom.classList.add('grow');
            });

            setTimeout(() => {
                this.dom.classList.remove('grow');
                this.dom.classList.add('shrink');
                this.isShown = false;
            }, 3000);
        }
    }
}
