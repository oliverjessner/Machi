import Dirt from './dirt.js';

type BuildingName = 'none' | 'tent' | 'house' | 'villa';
type Building = { wood: number; name: BuildingName; current: BuildingName; population: number };

export default class Grass extends Dirt {
    public hasTree: boolean = false;
    public hasStone: boolean = false;
    private building = 'none';
    protected isEmpty: boolean = true;

    constructor(cellNr: number, row: number, column: number, dom: HTMLElement) {
        super(cellNr, row, column, dom);
        this.type = 'grass';

        dom.classList.remove('dirt');
        dom.classList.add('grass');

        this.addFlower();
    }

    private addFlower(): void {
        const randomBetween1and3 = Math.floor(Math.random() * 20) + 1;
        const style = getComputedStyle(this.dom).backgroundImage;

        if (randomBetween1and3 === 1) {
            this.dom.style.backgroundImage = 'url(/assets/imgs/tiles/flowers/flowers_low.png),' + style;
        }
        if (randomBetween1and3 === 2) {
            this.dom.style.backgroundImage += 'url(/assets/imgs/tiles/flowers/flowers_dense.png),' + style;
        }
        if (randomBetween1and3 === 3) {
            this.dom.style.backgroundImage += 'url(/assets/imgs/tiles/flowers/flowers_middle.png),' + style;
        }
    }

    public addTree(): void {
        const style = getComputedStyle(this.dom).backgroundImage;
        const randomBetween1and2 = Math.floor(Math.random() * 3) + 1;

        this.dom.style.backgroundImage = `url(/assets/imgs/tiles/trees/tree${randomBetween1and2}.png),${style}`;

        this.hasTree = true;
        this.isEmpty = false;
    }

    public removeTree(): void {
        this.dom.style.backgroundImage = '';

        this.hasTree = false;
        this.isEmpty = true;
    }

    public addStone(): void {
        const style = getComputedStyle(this.dom).backgroundImage;

        this.dom.style.backgroundImage = `url(/assets/imgs/tiles/stones/stone.png),${style}`;
        this.hasStone = true;
        this.isEmpty = false;
    }

    public removeStone(): void {
        this.dom.style.backgroundImage = '';

        this.hasStone = false;
        this.isEmpty = true;
    }

    public addBuilding(building: BuildingName) {
        const style = getComputedStyle(this.dom).backgroundImage;

        this.isEmpty = false;
        this.building = building;
        this.dom.style.backgroundImage = `url(/assets/imgs/tiles/building/${building}.png),url(/assets/imgs/tiles/grass.png)`;
    }

    public costOfNextBuilding(): Building {
        if (this.building === 'tent') {
            return { wood: 8, name: 'house', current: 'tent', population: 3 };
        }
        if (this.building === 'house') {
            return { wood: 16, name: 'villa', current: 'house', population: 5 };
        }
        if (this.building === 'villa') {
            return { wood: 0, name: 'villa', current: 'villa', population: 0 };
        }

        return { wood: 5, name: 'tent', current: 'none', population: 1 };
    }
}
