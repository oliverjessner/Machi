import { randomFromTo } from '../random.js';
import { Grass } from '../tiles/grass.js';
import { Tile } from '../tiles/tile.js';

export abstract class Building {
    public readonly tileNr: number;
    abstract urls: string[];
    abstract readonly produceNeeds: BuildingNeed[];
    abstract produce(tiles: Tile[][], buildingTile: Tile): any;
    public hasFence = false;

    constructor(tileNr: number) {
        this.tileNr = tileNr;
    }

    public getUrl(): string | undefined {
        return this.urls[randomFromTo(0, this.urls.length - 1)];
    }

    public getFreeTiles(tiles: Tile[][], buildingTile: Tile): Grass | null {
        const leftTop = tiles[buildingTile.row - 1]?.[buildingTile.column - 1];
        const leftMiddle = tiles[buildingTile.row]?.[buildingTile.column - 1];
        const leftBottom = tiles[buildingTile.row + 1]?.[buildingTile.column - 1];
        const middleTop = tiles[buildingTile.row - 1]?.[buildingTile.column];
        const middleBottom = tiles[buildingTile.row + 1]?.[buildingTile.column];
        const rightTop = tiles[buildingTile.row - 1]?.[buildingTile.column + 1];
        const rightMiddle = tiles[buildingTile.row]?.[buildingTile.column + 1];
        const rightBottom = tiles[buildingTile.row + 1]?.[buildingTile.column + 1];

        if (leftTop && leftTop instanceof Grass && leftTop.isEmpty) {
            return leftTop;
        }
        if (leftMiddle && leftMiddle instanceof Grass && leftMiddle.isEmpty) {
            return leftMiddle;
        }
        if (leftBottom && leftBottom instanceof Grass && leftBottom.isEmpty) {
            return leftBottom;
        }
        if (middleTop && middleTop instanceof Grass && middleTop.isEmpty) {
            return middleTop;
        }
        if (middleBottom && middleBottom instanceof Grass && middleBottom.isEmpty) {
            return middleBottom;
        }
        if (rightTop && rightTop instanceof Grass && rightTop.isEmpty) {
            return rightTop;
        }
        if (rightMiddle && rightMiddle instanceof Grass && rightMiddle.isEmpty) {
            return rightMiddle;
        }
        if (rightBottom && rightBottom instanceof Grass && rightBottom.isEmpty) {
            return rightBottom;
        }

        return null;
    }
}
