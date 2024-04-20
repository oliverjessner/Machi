export class Tile {
    column;
    row;
    tileNr;
    dom;
    name;
    recourses = [];
    isEmpty = true;
    constructor(name, column, row, tileNr, dom) {
        this.name = name;
        this.column = column;
        this.row = row;
        this.tileNr = tileNr;
        this.dom = dom;
    }
}
