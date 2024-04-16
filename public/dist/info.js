export default class Info {
    dom = document.querySelector('#info');
    isShown = false;
    constructor() { }
    displayInfo(text) {
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
