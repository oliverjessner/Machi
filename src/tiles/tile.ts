export abstract class Tile {
    public readonly column: number;
    public readonly row: number;
    public readonly tileNr: number;
    public readonly dom: HTMLElement;
    public readonly name: string;
    public recourses: string[] = [];
    public isEmpty = true;

    constructor(name: string, column: number, row: number, tileNr: number, dom: HTMLElement) {
        this.name = name;
        this.column = column;
        this.row = row;
        this.tileNr = tileNr;
        this.dom = dom;
    }
}
