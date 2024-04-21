import { randomFromTo } from '../random.js';
import { Grass } from '../tiles/grass.js';
export class Building {
    tileNr;
    hasFence = false;
    constructor(tileNr) {
        this.tileNr = tileNr;
    }
    getUrl() {
        return this.urls[randomFromTo(0, this.urls.length - 1)];
    }
    getFreeTiles(tiles, buildingTile) {
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
