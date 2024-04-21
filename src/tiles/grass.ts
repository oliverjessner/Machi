/// <reference path="../buildings/building.d.ts" />

import { NonWaterTile } from './nonWaterTile.js';
import { randomFromTo } from '../random.js';
import { Building } from '../buildings/building.js';
import { BuildingFactory } from '../buildings/buildingFactory.js';
import { Tile } from './tile.js';
import { River } from './river.js';

const buildingFactory = new BuildingFactory();

export class Grass extends NonWaterTile {
    private building: Building | null = null;

    constructor(column: number, row: number, tileNr: number, dom: HTMLElement) {
        const randomBetween1and3 = randomFromTo(1, 3);
        super('grass', column, row, tileNr, dom);

        dom.classList.remove('dirt-1', 'dirt-2', 'dirt-3');
        dom.classList.add('grass-' + randomBetween1and3);
        this.addFlower();
    }

    private addFlower(): void {
        const randomBetween1and10 = randomFromTo(1, 15);
        const style = getComputedStyle(this.dom).backgroundImage;

        if (randomBetween1and10 === 1) {
            this.dom.style.backgroundImage = 'url(/assets/imgs/tiles/flowers/flowers_low.png),' + style;
            this.recourses.push('flower');
        }
        if (randomBetween1and10 === 2) {
            this.dom.style.backgroundImage += 'url(/assets/imgs/tiles/flowers/flowers_dense.png),' + style;
            this.recourses.push('flower');
        }
        if (randomBetween1and10 === 3) {
            this.dom.style.backgroundImage += 'url(/assets/imgs/tiles/flowers/flowers_middle.png),' + style;
            this.recourses.push('flower');
        }
    }

    public addTree(): void {
        const style = getComputedStyle(this.dom).backgroundImage;
        const randomBetween1and2 = randomFromTo(1, 3);

        this.dom.style.backgroundImage = `url(/assets/imgs/tiles/trees/tree${randomBetween1and2}.png),${style}`;
        this.isEmpty = false;
        this.recourses.push('tree');
    }

    public removeTree(): void {
        this.dom.style.backgroundImage = '';
        this.isEmpty = true;
        this.recourses = this.recourses.filter(recourse => recourse !== 'tree');
    }

    public addPumpkin(): void {
        const style = getComputedStyle(this.dom).backgroundImage;

        this.dom.style.backgroundImage = `url(/assets/imgs/tiles/pumpkins/pumpkin.png),${style}`;
        this.isEmpty = false;
        this.recourses.push('pumpkin');
    }

    public removePumpkin(): void {
        const style = getComputedStyle(this.dom).backgroundImage.split(',').slice(1).join(',');

        this.dom.style.backgroundImage = style;
        this.isEmpty = true;
        this.recourses = this.recourses.filter(recourse => recourse !== 'pumpkin');
    }

    private addFences(tiles: Tile[][], fence: string): void {
        const leftTop = tiles[this.row - 1]?.[this.column - 1];
        const leftMiddle = tiles[this.row]?.[this.column - 1];
        const leftBottom = tiles[this.row + 1]?.[this.column - 1];
        const middleTop = tiles[this.row - 1]?.[this.column];
        const middleBottom = tiles[this.row + 1]?.[this.column];
        const rightTop = tiles[this.row - 1]?.[this.column + 1];
        const rightMiddle = tiles[this.row]?.[this.column + 1];
        const rightBottom = tiles[this.row + 1]?.[this.column + 1];

        if (leftTop && !(leftTop instanceof River) && leftTop.isEmpty) {
            const style = getComputedStyle(leftTop.dom).backgroundImage;
            leftTop.dom.style.backgroundImage = `url(/assets/imgs/tiles/fences/${fence}/corner_top_left.png),${style}`;
        }
        if (leftMiddle && !(leftMiddle instanceof River) && leftMiddle.isEmpty) {
            const style = getComputedStyle(leftMiddle.dom).backgroundImage;
            leftMiddle.dom.style.backgroundImage = `url(/assets/imgs/tiles/fences/${fence}/vertical_left.png),${style}`;
        }
        if (leftBottom && !(leftBottom instanceof River) && leftBottom.isEmpty) {
            const style = getComputedStyle(leftBottom.dom).backgroundImage;
            leftBottom.dom.style.backgroundImage = `url(/assets/imgs/tiles/fences/${fence}/corner_bottom_left.png),${style}`;
        }
        if (middleTop && !(middleTop instanceof River) && middleTop.isEmpty) {
            const style = getComputedStyle(middleTop.dom).backgroundImage;
            middleTop.dom.style.backgroundImage = `url(/assets/imgs/tiles/fences/${fence}/horizontal_top.png),${style}`;
        }
        if (middleBottom && !(middleBottom instanceof River) && middleBottom.isEmpty) {
            const style = getComputedStyle(middleBottom.dom).backgroundImage;
            middleBottom.dom.style.backgroundImage = `url(/assets/imgs/tiles/fences/${fence}/horizontal_bottom.png),${style}`;
        }
        if (rightTop && !(rightTop instanceof River) && rightTop.isEmpty) {
            const style = getComputedStyle(rightTop.dom).backgroundImage;
            rightTop.dom.style.backgroundImage = `url(/assets/imgs/tiles/fences/${fence}/corner_top_right.png),${style}`;
        }
        if (rightMiddle && !(rightMiddle instanceof River) && rightMiddle.isEmpty) {
            const style = getComputedStyle(rightMiddle.dom).backgroundImage;
            rightMiddle.dom.style.backgroundImage = `url(/assets/imgs/tiles/fences/${fence}/vertical_right.png),${style}`;
        }
        if (rightBottom && !(rightBottom instanceof River) && rightBottom.isEmpty) {
            const style = getComputedStyle(rightBottom.dom).backgroundImage;
            rightBottom.dom.style.backgroundImage = `url(/assets/imgs/tiles/fences/${fence}/corner_bottom_right.png),${style}`;
        }
    }

    public addBuilding(name: BuildingName, tiles: Tile[][]): void {
        const style = getComputedStyle(this.dom).backgroundImage;

        this.building = buildingFactory.generate(name, this.tileNr);

        if (this.building.hasFence) {
            this.addFences(tiles, this.building?.fence);
        }

        this.dom.style.backgroundImage = `url(/assets/imgs/tiles/building/${this.building.url}),${style}`;
        this.isEmpty = false;
    }

    public removeBuilding(): void {
        if (!this.building) {
            return;
        }

        const style = getComputedStyle(this.dom).backgroundImage;
        const styleWithoutBuilding = style.split(',').slice(1).join(',');

        this.dom.style.backgroundImage = styleWithoutBuilding;
        buildingFactory.remove(this.building);
        this.building = null;
    }

    public getBuilding(): Building | null {
        return this.building;
    }
}
