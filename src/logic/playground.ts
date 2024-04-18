import Dirt from './tiles/dirt.js';
import Grass from './tiles/grass.js';
import River from './tiles/river.js';
import Info from './info.js';
import { Recourses } from './recourses.js';
import { BuildingMenu, BuildingMenuItem } from './buildingMenu.js';

const info = new Info();
const dev = localStorage.getItem('dev') === 'true';
const playgroundDOM = document.querySelector('main') as HTMLElement;

export default class Playground {
    private height: number;
    private width: number;
    private livingTrees: number = 0;
    private grid: Dirt[][] = [[]];
    private recourses: Recourses;
    private config: ConfigType;

    constructor(config: ConfigType, recourses: Recourses) {
        this.recourses = recourses;
        this.config = config;
        this.height = config.height;
        this.width = config.width;
        playgroundDOM.style.setProperty('--playground-width', config.width + '');
    }

    public generatePlaygroundOnDOM(): void {
        let columns = [];
        let row = [];

        for (let i = 0; i < this.height * this.width; i++) {
            const cell = document.createElement('div');
            const cellNr = i + '';
            const rowNr = Math.floor(i / this.width);
            const columnNr = i % this.width;

            cell.dataset.nr = cellNr;
            cell.textContent = dev ? cellNr : '';

            playgroundDOM.appendChild(cell);

            if (i !== 0 && i % this.width === 0) {
                columns.push(row);
                row = [];
                row.push(new Dirt(i, rowNr, columnNr, cell)); // first cell in row
            } else {
                row.push(new Dirt(i, rowNr, columnNr, cell));
            }
        }
        columns.push(row);

        this.grid = columns;
    }

    public generatRandomGrass(percent: number): void {
        const grassCount = Math.floor(this.height * this.width * (percent / 100));
        const allreadyPickedCells: number[] = [];

        while (allreadyPickedCells.length < grassCount) {
            const cellNr = Math.floor(Math.random() * this.height * this.width);
            const cell = document.querySelector(`[data-nr="${cellNr}"]`) as HTMLElement;

            if (!allreadyPickedCells.includes(cellNr)) {
                const row = Math.floor(cellNr / this.width);
                const column = cellNr % this.width;

                allreadyPickedCells.push(cellNr);

                if (this.grid[row] === undefined || this.grid[row]?.[column] === undefined) {
                    console.log(this.grid);
                    console.log(`no cell found for grass ${cellNr}, row: ${row}, column: ${column}`);
                } else {
                    this.grid[row][column] = new Grass(cellNr, row, column, cell);
                }
            }
        }
    }

    private getRandomeCell(): number {
        return Math.floor(Math.random() * this.height * this.width);
    }

    private _generatRandomTrees(treeCount: number): void {
        while (treeCount !== 0) {
            const cellNr = this.getRandomeCell();
            const column = Math.floor(cellNr / this.width);
            const row = cellNr % this.width;
            const tile = this.grid[column]?.[row];

            if (!tile) {
                console.log(this.grid);
                console.log(`no cell found for tree ${cellNr}, row: ${row}, column: ${column}`);
                continue;
            }
            if (tile instanceof Grass && !tile.hasTree && tile.isEmpty) {
                tile.addTree();
                treeCount--;
                this.livingTrees++;
            }
        }
    }

    public generatRandomTrees(amount: number, percent: boolean): void {
        if (percent) {
            let treeCount = Math.floor(this.height * this.width * (amount / 100));
            return this._generatRandomTrees(treeCount);
        }

        return this._generatRandomTrees(amount);
    }

    public generateRandomStones(stones: number): void {
        let stoneCount = Math.floor(this.height * this.width * (stones / 100));

        while (stoneCount !== 0) {
            const cellNr = this.getRandomeCell();
            const column = Math.floor(cellNr / this.width);
            const row = cellNr % this.width;
            const tile = this.grid[column]?.[row];

            if (!tile) {
                console.log(this.grid);
                console.log(`no cell found for stone ${cellNr}, row: ${row}, column: ${column}`);
                continue;
            }
            if (tile instanceof Grass && !tile.hasTree) {
                tile.addStone();
                stoneCount--;
            }
        }
    }

    public generateRivers(rivers: number): void {
        for (let i = 0; i < rivers; i++) {
            this.generateStartTile();
        }
    }

    private getNextRiverTile(tile: Dirt, tiles: Dirt[]): Dirt {
        const direction = Math.floor(Math.random() * 4);
        const getPosition = Object.freeze({
            0: () => this.grid[tile.row - 1]?.[tile.column],
            1: () => this.grid[tile.row + 1]?.[tile.column],
            2: () => this.grid[tile.row]?.[tile.column - 1],
            3: () => this.grid[tile.row]?.[tile.column + 1],
        });
        const position: Dirt = getPosition[direction]() as Dirt;

        if (!position) {
            return this.getNextRiverTile(tile, tiles);
        }

        const isAlreadyInTiles = tiles.find(t => t.cellNr === position.cellNr);

        if (isAlreadyInTiles || position instanceof River) {
            return this.getNextRiverTile(tile, tiles);
        }

        return position;
    }

    private generateRiver(startTile: Dirt): void {
        const tiles = [startTile];
        const riverSize = Math.floor(this.height * this.width * 0.03);

        for (let i = 0; i < riverSize - 1; i++) {
            const lastTile = tiles[i];
            const nextTile = this.getNextRiverTile(lastTile, tiles);

            if (!nextTile) {
                return;
            }

            tiles.push(nextTile);
        }

        tiles.forEach((tile: Dirt, i: number) => {
            let level = '';

            if (i === 0) {
                const next = tiles[i + 1];

                if (tile.column === next?.column && next?.row < tile.row) {
                    level = 'end_bottom';
                }
                if (tile.column === next?.column && next?.row > tile.row) {
                    level = 'end_top';
                }
                if (tile.row === next?.row && next?.column > tile.column) {
                    level = 'end_left';
                }
                if (tile.row === next?.row && next?.column < tile.column) {
                    level = 'end_right';
                }
            }
            if (i === tiles.length - 1) {
                const prev = tiles[i - 1];

                if (tile.column === prev?.column && prev?.row < tile.row) {
                    level = 'end_bottom';
                }
                if (tile.column === prev?.column && prev?.row > tile.row) {
                    level = 'end_top';
                }
                if (tile.row === prev?.row && prev?.column > tile.column) {
                    level = 'end_left';
                }
                if (tile.row === prev?.row && prev?.column < tile.column) {
                    level = 'end_right';
                }
            }
            if (i !== 0 && i !== tiles.length - 1) {
                const prev = tiles[i - 1];
                const next = tiles[i + 1];

                if (next?.row === prev?.row) {
                    level = 'horizontal';
                }
                if (next?.column === prev?.column) {
                    level = 'vertical';
                }
                if ((prev && prev?.column < tile.column) || (next && next?.column < tile.column)) {
                    if ((prev && prev?.row < tile.row) || (next && next?.row < tile.row)) {
                        level = 'top_left';
                    }
                    if ((prev && prev?.row > tile.row) || (next && next?.row > tile.row)) {
                        level = 'bottom_left';
                    }
                }
                if ((prev && prev?.column > tile.column) || (next && next?.column > tile.column)) {
                    if ((prev && prev?.row < tile.row) || (next && next?.row < tile.row)) {
                        level = 'top_right';
                    }
                    if ((prev && prev?.row > tile.row) || (next && next?.row > tile.row)) {
                        level = 'bottom_right';
                    }
                }
            }

            this.grid[tile.row][tile.column] = new River(tile.cellNr, tile.row, tile.column, tile.dom, level);
        });
    }

    public generateStartTile(): void {
        const cellNr = this.getRandomeCell();
        const tile = this.getTile(cellNr);

        if ((tile instanceof Grass && tile.hasTree) || tile instanceof River) {
            return this.generateStartTile();
        }
        if (!tile) {
            return;
        }

        return this.generateRiver(tile);
    }

    public getTile(cellNr: number): Dirt | null {
        const row = Math.floor(cellNr / this.width);
        const column = cellNr % this.width;
        const tile = this.grid[row]?.[column];

        return tile || null;
    }

    private convertDirtnessToGrass(tile: Dirt): void {
        if (this.recourses.seeds === 0) {
            const text = 'Not enough seeds, need one seed to convert dirt to grass. Cut Trees';
            info.displayInfo(text);

            return;
        }

        this.recourses.seeds--;
        this.recourses.renderRecourses();
        this.grid[tile.row][tile.column] = new Grass(tile.cellNr, tile.row, tile.column, tile.dom);
    }

    private build(tile: Grass, activeBuilding: BuildingMenuItem, buildingMenu: BuildingMenu): void {
        const areEnoughRecourses = activeBuilding.needs.every(need => this.recourses[need.name] >= need.amount);

        if (!tile.isEmpty) {
            return;
        }
        if (areEnoughRecourses) {
            this.recourses.subtract(activeBuilding.needs);
            this.recourses.add(activeBuilding.gifts);
            this.recourses.renderRecourses();
            buildingMenu.addBuilding(activeBuilding.name, tile);
        } else {
            const text = `Not enough recourses, need ${activeBuilding.needs
                .map(need => ` ${need.amount} ${need.emoji}`)
                .join(', ')} to build a ${activeBuilding.name}.`;

            info.displayInfo(text);
            buildingMenu.makeBuildingSelectInactive();
        }
    }

    private changeLandscape(tile: Grass): void {
        const needPopulationToCollectStone = 6;

        if (tile.hasTree) {
            new Audio('/assets/audio/chop.wav').play();
            tile.removeTree();
            this.livingTrees--;
            this.recourses.wood++;
            this.recourses.seeds++;
            return this.recourses.renderRecourses();
        }
        if (tile.hasStone && this.recourses.population >= needPopulationToCollectStone) {
            new Audio('/assets/audio/pickaxe.wav').play();
            tile.removeStone();
            this.recourses.stone++;
            return this.recourses.renderRecourses();
        }
        if (tile.hasStone && this.recourses.population < needPopulationToCollectStone) {
            const text = `Not enough people, need ${needPopulationToCollectStone} people to collect a stone. Build tents & houses`;
            return info.displayInfo(text);
        }
    }

    private clickOnGrass(tile: Grass, buildingMenu: BuildingMenu): void {
        const activeBuilding = buildingMenu.getActiveBuilding();

        if (!tile.hasTree && !tile.hasStone && activeBuilding) {
            return this.build(tile, activeBuilding, buildingMenu);
        } else {
            return this.changeLandscape(tile);
        }
    }

    public clickOnTile(cellNr: number, buildingMenu: BuildingMenu): void {
        const tile = this.getTile(cellNr) as Grass;
        const clickAction: any = Object.freeze({
            dirt: () => this.convertDirtnessToGrass(tile),
            grass: () => this.clickOnGrass(tile, buildingMenu),
        });
        const action: Function | undefined = clickAction[tile.type];

        if (action) {
            return action();
        }
    }

    public isAllDirtGone(): boolean {
        return this.grid.flat().every((tile: any) => tile.type !== 'dirt');
    }

    public areAllTreesCutted(): boolean {
        return this.grid.flat().every((tile: any) => tile.type !== 'grass' || !tile.hasTree);
    }

    public areAllStonesRemoved(): boolean {
        return this.grid.flat().every((tile: any) => tile.type !== 'grass' || !tile.hasStone);
    }

    public click(callback: (event: Event) => void): void {
        playgroundDOM.addEventListener('click', function (event: Event) {
            return callback(event);
        });
    }

    public environmentEvents() {
        const amountOfTrees = Math.floor((this.livingTrees / (this.height * this.width)) * 100);

        if (dev) {
            console.log('environment events');
            console.log(`living trees: ${this.livingTrees}: ${amountOfTrees}/${this.config.trees}%`);
        }

        return {
            ranger: () => {
                if (amountOfTrees < this.config.trees) {
                    this.generatRandomTrees(1, false);
                }
            },
            tent: () => {},
            spring: () => {},
            house: () => {},
        };
    }
}
