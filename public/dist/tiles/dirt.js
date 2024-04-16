export default class Dirt {
    type;
    dom;
    row;
    column;
    cellNr;
    constructor(cellNr, row, column, dom) {
        this.type = 'dirt';
        this.cellNr = cellNr;
        this.dom = dom;
        this.row = row;
        this.column = column;
        dom.classList.add('cell', 'dirt');
    }
}
