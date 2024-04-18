import Dirt from './dirt.js';
import { BuildingName } from '../buildingMenu.js';

export default class Grass extends Dirt {
    public hasTree: boolean = false;
    public hasStone: boolean = false;
    public isEmpty: boolean = true;

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
        this.dom.style.backgroundImage = `url(/assets/imgs/tiles/building/${building}.png),url(/assets/imgs/tiles/grass.png)`;
    }
}
