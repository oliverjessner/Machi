import { BuildingNeed } from './buildingMenu';

const recoursesEmojisData = ['👨‍👩‍👧‍👦', '🌱', '🌲', '🪨', '💧', '🍔', '💎'] as const;
const recoursesData = ['population', 'seeds', 'wood', 'stone', 'water', 'food', 'diamonds'] as const;
const recoursesDOM = document.querySelector('header nav ul') as HTMLElement;
const fallBackRecourses = { rounds: 0, population: 0, seeds: 0, wood: 0, stone: 0, water: 0, food: 0, diamonds: 0 };

export type RecoursesType = (typeof recoursesData)[number];
export type RecoursesEmojisType = (typeof recoursesEmojisData)[number];
export class Recourses {
    [key: string]: any;
    private populationDOM: HTMLElement | null = null;
    private waterDOM: HTMLElement | null = null;
    private diamondsDOM: HTMLElement | null = null;
    private foodDOM: HTMLElement | null = null;
    private woodDOM: HTMLElement | null = null;
    private stoneDOM: HTMLElement | null = null;
    private seedsDOM: HTMLElement | null = null;
    private roundsDOM: HTMLElement | null = null;

    renderRecourseMenu(recs: typeof fallBackRecourses = fallBackRecourses) {
        const recsDir = Object.entries(recs);
        const recoursesDOMElements = recoursesData.map((recourse: RecoursesType, i: number) => {
            const li = document.createElement('li');
            const span = document.createElement('span');

            li.innerText = `${recoursesEmojisData[i]} `;
            span.textContent = recsDir[i]?.[1] + '';
            li.id = recourse;
            li.append(span);

            return li;
        });

        recoursesDOM.append(...recoursesDOMElements);
        recsDir.forEach(([key, value]: [string, number]) => {
            this[key] = value;
        });

        this.populationDOM = document.querySelector('#population span') as HTMLElement;
        this.waterDOM = document.querySelector('#water span') as HTMLElement;
        this.diamondsDOM = document.querySelector('#diamonds span') as HTMLElement;
        this.foodDOM = document.querySelector('#food span') as HTMLElement;
        this.woodDOM = document.querySelector('#wood span') as HTMLElement;
        this.stoneDOM = document.querySelector('#stone span') as HTMLElement;
        this.seedsDOM = document.querySelector('#seeds span') as HTMLElement;
    }

    public renderRecourses(rounds = 0): void {
        if (
            this.populationDOM === null ||
            this.waterDOM === null ||
            this.diamondsDOM === null ||
            this.foodDOM === null ||
            this.woodDOM === null ||
            this.stoneDOM === null ||
            this.seedsDOM === null
        ) {
            return;
        }
        this.populationDOM.textContent = this.population + '';
        this.waterDOM.textContent = this.water + '';
        this.diamondsDOM.textContent = this.diamonds + '';
        this.foodDOM.textContent = this.food + '';
        this.woodDOM.textContent = this.wood + '';
        this.stoneDOM.textContent = this.stone + '';
        this.seedsDOM.textContent = this.seeds + '';
    }

    public subtract(recourses: BuildingNeed[]): void {
        recourses.forEach(rec => {
            this[rec.name] -= rec.amount;
        });
    }

    public add(recourses: BuildingNeed[]): void {
        recourses.forEach((rec: { name: RecoursesType; amount: number }) => {
            this[rec.name] += rec.amount;
        });
    }
}
