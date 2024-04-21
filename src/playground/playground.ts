import { Tile } from '../tiles/tile.js';
import { Dirt } from '../tiles/dirt.js';
import { Grass } from '../tiles/grass.js';
import { River } from '../tiles/river.js';
import { RecourseCollector } from '../collectors/recourseCollector.js';
import { InfoPopUp } from '../infoPopUp/infopopup.js';
import { NonWaterTile } from '../tiles/nonWaterTile.js';
import { BuildingMenu } from '../menus/buildingMenu/buildingMenu.js';
import { BuildingFactory } from '../buildings/buildingFactory.js';

const infoPopUp = new InfoPopUp();
const buildingFactory = new BuildingFactory();

export class Playground {
    private dom: HTMLElement;
    private tilesGrid: Tile[][] = [];
    private height: number;
    private width: number;
    private config: ConfigType;
    private devMode: boolean;

    constructor(config: ConfigType, dom: HTMLElement, devMode: boolean) {
        this.dom = dom;
        this.config = config;
        this.height = config.height;
        this.width = config.width;
        this.devMode = devMode;
        this.dom.style.setProperty('--playground-width', config.width + '');
    }

    private getTile(tileNr: number): Tile | undefined {
        return this.tilesGrid.flat().find(tile => tile.tileNr === tileNr);
    }

    private getRandomTile(): Tile {
        const tiles = this.tilesGrid.flat();
        const randomTile = tiles[Math.floor(Math.random() * tiles.length)];

        if (!randomTile) {
            return this.getRandomTile();
        }

        return randomTile;
    }

    private renderGrass() {
        const columns = [];
        let row = [];

        for (let i = 0; i < this.height * this.width; i++) {
            const tile = document.createElement('div');
            const tileNr = i + '';
            const rowNr = Math.floor(i / this.width);
            const columnNr = i % this.width;

            tile.dataset.nr = tileNr;
            tile.classList.add('tile', 'grass');

            if (this.devMode) {
                tile.innerHTML = `<small>${tileNr} ${rowNr},${columnNr}</small>`;
            }

            this.dom.appendChild(tile);

            if (i !== 0 && i % this.width === 0) {
                columns.push(row);
                row = [];
                row.push(new Grass(columnNr, rowNr, i, tile)); // first cell in row
            } else {
                row.push(new Grass(columnNr, rowNr, i, tile));
            }
        }
        columns.push(row);

        this.tilesGrid = columns;
    }

    private renderDirt() {
        const grassCount = Math.floor(this.height * this.width * (this.config.grass / 100));
        const tiles = this.tilesGrid.flat();
        const dirt = tiles.length - grassCount;
        let dirtCount = 0;

        while (dirtCount < dirt) {
            const tile = this.getRandomTile();

            if (tile instanceof Dirt || tile instanceof River) {
                continue;
            }

            this.tilesGrid[tile.row][tile.column] = new Dirt(tile.column, tile.row, tile.tileNr, tile.dom);

            dirtCount++;
        }
    }

    private getNextRiverTile(tile: Tile, tiles: Tile[]): Tile {
        const direction = Math.floor(Math.random() * 4);
        const getPosition = Object.freeze({
            0: () => this.tilesGrid[tile.row - 1]?.[tile.column], // top
            1: () => this.tilesGrid[tile.row + 1]?.[tile.column], // bottom
            2: () => this.tilesGrid[tile.row]?.[tile.column - 1], // left
            3: () => this.tilesGrid[tile.row]?.[tile.column + 1], // right
        });
        const position: Tile = getPosition[direction]();

        if (!position) {
            return this.getNextRiverTile(tile, tiles);
        }

        const isAlreadyInTiles = tiles.find(t => t.tileNr === position.tileNr);

        if (isAlreadyInTiles || position instanceof River) {
            return this.getNextRiverTile(tile, tiles);
        }

        return position;
    }

    private renderRiverPart(startTile: Tile) {
        const tiles = [startTile];
        const riverSize = Math.floor(this.height * this.width * 0.03);

        for (let i = 0; i < riverSize - 1; i++) {
            const lastTile = tiles[i] as Tile;
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

            this.tilesGrid[tile.row][tile.column] = new River(tile.column, tile.row, tile.tileNr, tile.dom, level);
        });
    }

    private renderStartRiver(): void {
        const tiles = this.tilesGrid.flat();
        const randomTile = this.getRandomTile();

        if (!randomTile || !randomTile.isEmpty || randomTile instanceof River) {
            return this.renderStartRiver();
        }
        if (!randomTile) {
            throw new Error(`No tile found ${randomTile} ${tiles.length}`);
        }

        return this.renderRiverPart(randomTile);
    }

    private renderRivers() {
        for (let i = 0; i < this.config.rivers; i++) {
            this.renderStartRiver();
        }
    }

    private _renderTrees(treeCount: number): void {
        if (this.devMode) {
            console.log('Trying to render trees:', treeCount);
        }
        while (treeCount !== 0) {
            const tile = this.getRandomTile();

            if (tile instanceof Grass && tile.isEmpty) {
                tile.addTree();
                treeCount--;
            }
        }
    }

    private renderTrees(amount: number = 20, percent: boolean = false) {
        if (percent) {
            const treeCount = Math.floor(this.height * this.width * (amount / 100));
            return this._renderTrees(treeCount);
        }

        return this._renderTrees(amount);
    }

    private renderStones(stoneCount: number) {
        if (this.devMode) {
            console.log('Trying to render strones:', stoneCount);
        }
        while (stoneCount !== 0) {
            const tile = this.getRandomTile() as NonWaterTile;

            if (!(tile instanceof River) && tile.isEmpty) {
                tile.addStone();
                stoneCount--;
            }
        }
    }

    public render() {
        this.renderGrass();
        this.renderRivers();
        this.renderDirt();
        this.renderTrees(this.config.trees, true);
        this.renderStones(this.config.stone);

        if (this.config.barrels > 0) {
            this.renderBarrels(this.config.barrels);
        }
    }

    private convertDirtnessToGrass(tile: Dirt, recourseCollector: RecourseCollector): void {
        if (recourseCollector.seeds === 0) {
            const text = 'Not enough seeds, need one seed to convert dirt to grass. Cut Trees';
            return infoPopUp.displayInfo(text);
        }

        recourseCollector.seeds--;
        this.tilesGrid[tile.row][tile.column] = new Grass(tile.column, tile.row, tile.tileNr, tile.dom);
    }

    private mineStone(tile: NonWaterTile, recourseCollector: RecourseCollector): void {
        const neededPopulation = 3;

        if (neededPopulation > recourseCollector.population) {
            const text = 'Not enough population, need one person to mine stone';
            return infoPopUp.displayInfo(text);
        }

        tile.removeStone();
        recourseCollector.stone += 1;
        new Audio('/assets/audio/pickaxe.wav').play();
    }

    private cutTree(tile: Grass, recourseCollector: RecourseCollector): void {
        tile.removeTree();
        recourseCollector.wood += 1;
        recourseCollector.seeds += 2;
        new Audio('/assets/audio/chop.wav').play();
    }

    private buildBuilding(tile: Grass, buildingMenu: BuildingMenu, recourseCollector: RecourseCollector): void {
        const activeBuilding = buildingMenu.getActiveBuilding() as BuildingMenuItem;
        const recourses = recourseCollector.getAll();
        const cost = activeBuilding.needs;
        const enoughRecourses = cost.every(function (cost) {
            const recource = recourses.find(rec => rec.name === cost.name);
            return recource && recource.amount >= cost.amount;
        });

        if (!enoughRecourses) {
            buildingMenu.deactivateBuilding();
            return infoPopUp.displayInfo(
                `Not enough recourses, need ${cost.map(cost => `${cost.emoji} ${cost.amount}`).join(' ')}`,
            );
        }

        tile.addBuilding(activeBuilding?.name, this.tilesGrid);
        recourseCollector.subtract(cost);
        recourseCollector.add(activeBuilding.gifts);
        new Audio('/assets/audio/build.wav').play();
    }

    public farmPumpkin(tile: Grass, recourseCollector: RecourseCollector): void {
        tile.removePumpkin();
        recourseCollector.food += 1;
        new Audio('/assets/audio/chop.wav').play();
    }

    public renderBarrels(amount: number): void {
        for (let i = 0; i < amount; i++) {
            const tiles = this.tilesGrid.flat();
            const randomTile = this.getRandomTile() as NonWaterTile;

            if (!randomTile || !randomTile.isEmpty || randomTile instanceof River) {
                return this.renderBarrels(amount);
            }
            if (!randomTile) {
                throw new Error(`No tile found ${randomTile} ${tiles.length}`);
            }

            randomTile.addItem('barrel');
        }
    }

    public openItem(tile: NonWaterTile, recourseCollector: RecourseCollector): void {
        const need = tile.removeBarrel();

        infoPopUp.displayInfo(`You got \n ${need.map(need => `${need.emoji} ${need.amount}`).join(' ')}`);
        recourseCollector.add(need);

        new Audio('/assets/audio/open.wav').play();
    }

    public clickTile(tileNr: number, recourseCollector: RecourseCollector, buildingMenu: BuildingMenu) {
        const tile = this.getTile(tileNr);
        const isBuildingActive = buildingMenu.isBuildingActive();

        if (!tile) {
            console.log(tileNr, tile, tile?.isEmpty, isBuildingActive);
            console.log(this.tilesGrid.flat());
        }

        if (!tile) {
            return;
        }
        if (tile instanceof Dirt && tile.isEmpty) {
            buildingMenu.deactivateBuilding();
            return this.convertDirtnessToGrass(tile, recourseCollector);
        }
        if (tile instanceof Grass && tile.isEmpty && isBuildingActive) {
            return this.buildBuilding(tile, buildingMenu, recourseCollector);
        }
        if (tile.recourses.includes('tree')) {
            buildingMenu.deactivateBuilding();
            return this.cutTree(tile as Grass, recourseCollector);
        }
        if (tile.recourses.includes('stone')) {
            buildingMenu.deactivateBuilding();
            return this.mineStone(tile as NonWaterTile, recourseCollector);
        }
        if (tile.recourses.includes('barrel')) {
            buildingMenu.deactivateBuilding();
            return this.openItem(tile as NonWaterTile, recourseCollector);
        }
        if (tile.recourses.includes('pumpkin')) {
            buildingMenu.deactivateBuilding();
            return this.farmPumpkin(tile as Grass, recourseCollector);
        }
        if (tile instanceof Grass && tile.isEmpty) {
        }
        if (tile instanceof River) {
        }
    }

    public timerTick(recourseCollector: RecourseCollector) {
        const buildings = buildingFactory.getAll();
        const recourses = recourseCollector.getAll();

        buildings.forEach(building => {
            const cost = building.produceNeeds;
            const tile = this.getTile(building.tileNr) as Tile;
            const skipCheck = cost?.length === 0;

            const enoughRecourses =
                skipCheck ||
                cost.every(function (cost) {
                    const recource = recourses.find(rec => rec.name === cost.name);
                    return recource && recource.amount >= cost.amount;
                });

            if (enoughRecourses) {
                const recs = building.produce(this.tilesGrid, tile);

                if (recs) {
                    recourseCollector.subtract(cost);

                    if (recs?.length) {
                        recourseCollector.add(recs);
                    }
                }
            }
        });
    }
}
