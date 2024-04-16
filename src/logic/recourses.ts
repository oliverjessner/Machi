export default class Recourses {
    private populationDOM = document.querySelector('#population span') as HTMLElement;
    private goldDOM = document.querySelector('#gold span') as HTMLElement;
    private diamondsDOM = document.querySelector('#diamonds span') as HTMLElement;
    private foodDOM = document.querySelector('#food span') as HTMLElement;
    private woodDOM = document.querySelector('#wood span') as HTMLElement;
    private stoneDOM = document.querySelector('#stone span') as HTMLElement;
    private seedsDOM = document.querySelector('#seeds span') as HTMLElement;
    private roundsDOM = document.querySelector('#rounds span') as HTMLElement;
    public population: number;
    public gold: number;
    public diamonds: number;
    public food: number;
    public wood: number;
    public stone: number;
    public seeds: number;

    constructor(
        population: number = 0,
        gold: number = 0,
        diamonds: number = 1,
        food: number = 0,
        wood: number = 0,
        stone: number = 0,
        seeds: number = 0,
    ) {
        this.population = population;
        this.gold = gold;
        this.diamonds = diamonds;
        this.food = food;
        this.wood = wood;
        this.stone = stone;
        this.seeds = seeds;
        this.renderRecourses();
    }

    public renderRecourses(rounds = 0): void {
        this.populationDOM.textContent = this.population + '';
        this.goldDOM.textContent = this.gold + '';
        this.diamondsDOM.textContent = this.diamonds + '';
        this.foodDOM.textContent = this.food + '';
        this.woodDOM.textContent = this.wood + '';
        this.stoneDOM.textContent = this.stone + '';
        this.seedsDOM.textContent = this.seeds + '';
        this.roundsDOM.textContent = rounds + '';
    }
}
