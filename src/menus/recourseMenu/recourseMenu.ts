import { Menu } from '../menu.js';
import { RecourseCollector } from '../../collectors/recourseCollector.js';
const recoursesEmojisData: emojisData[] = ['👨‍👩‍👧‍👦', '🌱', '🌲', '🪨', '💧', '🍞', '🪙'];

export class RecourseMenu extends Menu {
    private recourseCollector: RecourseCollector;
    private population: HTMLElement | null = null;
    private seeds: HTMLElement | null = null;
    private wood: HTMLElement | null = null;
    private stone: HTMLElement | null = null;
    private food: HTMLElement | null = null;
    private water: HTMLElement | null = null;
    private diamonds: HTMLElement | null = null;
    private devMode: boolean;

    constructor(dom: HTMLElement, recourseCollector: RecourseCollector, devMode: boolean) {
        const recourses = recourseCollector.getAll();

        super(dom);
        this.recourseCollector = recourseCollector;
        this.devMode = devMode;

        const recoursesDOMElements = recourses.map((recourse, i) => {
            const div = document.createElement('div');
            const span = document.createElement('span');

            div.innerText = `${recoursesEmojisData[i]} `;
            span.textContent = recourse.amount + '';
            div.id = recourse.name;
            div.append(span);

            return div;
        });
        dom.append(...recoursesDOMElements);
        recourses.forEach(element => {
            this[element.name] = this.dom.querySelector(`.recourses-menu #${element.name} span`) as HTMLElement;
        });
    }

    public render() {
        const recourses = this.recourseCollector.getAll();

        recourses.forEach(recourse => {
            if (this[recourse.name] !== null) {
                this[recourse.name].textContent = recourse.amount + '';
            }
        });
    }
}
