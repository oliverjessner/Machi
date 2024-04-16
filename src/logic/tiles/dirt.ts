export default class Dirt {
    protected type: string;
    public dom: HTMLElement;
    public row: number;
    public column: number;
    public cellNr: number;

    constructor(cellNr: number, row: number, column: number, dom: HTMLElement) {
        this.type = 'dirt';
        this.cellNr = cellNr;
        this.dom = dom;
        this.row = row;
        this.column = column;

        dom.classList.add('cell', 'dirt');
    }
}
