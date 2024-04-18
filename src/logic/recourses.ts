import { BuildingNeed } from './buildingMenu';

const recoursesEmojisData = ['🕣', '👨‍👩‍👧‍👦', '🌱', '🌲', '🪨', '💧', '🍔', '💎'] as const;
const recoursesData = ['rounds', 'population', 'seeds', 'wood', 'stone', 'water', 'food', 'diamonds'] as const;
const recoursesDOM = document.querySelector('header nav ul') as HTMLElement;
const fallBackRecourses = { rounds: 0, population: 0, seeds: 0, wood: 0, stone: 0, water: 0, food: 0, diamonds: 0 };

export type RecoursesType = (typeof recoursesData)[number];
export type RecoursesEmojisType = (typeof recoursesEmojisData)[number];
export class Recourses {
    [key: string]: any;
    private populationDOM: HTMLElement;
    private waterDOM: HTMLElement;
    private diamondsDOM: HTMLElement;
    private foodDOM: HTMLElement;
    private woodDOM: HTMLElement;
    private stoneDOM: HTMLElement;
    private seedsDOM: HTMLElement;
    private roundsDOM: HTMLElement;

    constructor(recs: typeof fallBackRecourses = fallBackRecourses) {
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
        this.roundsDOM = document.querySelector('#rounds span') as HTMLElement;
    }

    public renderRecourses(rounds = 0): void {
        this.populationDOM.textContent = this.population + '';
        this.waterDOM.textContent = this.water + '';
        this.diamondsDOM.textContent = this.diamonds + '';
        this.foodDOM.textContent = this.food + '';
        this.woodDOM.textContent = this.wood + '';
        this.stoneDOM.textContent = this.stone + '';
        this.seedsDOM.textContent = this.seeds + '';
        this.roundsDOM.textContent = rounds + '';
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
