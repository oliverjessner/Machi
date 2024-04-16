export default class Recourses {
    populationDOM = document.querySelector('#population span');
    goldDOM = document.querySelector('#gold span');
    diamondsDOM = document.querySelector('#diamonds span');
    foodDOM = document.querySelector('#food span');
    woodDOM = document.querySelector('#wood span');
    stoneDOM = document.querySelector('#stone span');
    seedsDOM = document.querySelector('#seeds span');
    roundsDOM = document.querySelector('#rounds span');
    population;
    gold;
    diamonds;
    food;
    wood;
    stone;
    seeds;
    constructor(population = 0, gold = 0, diamonds = 1, food = 0, wood = 0, stone = 0, seeds = 0) {
        this.population = population;
        this.gold = gold;
        this.diamonds = diamonds;
        this.food = food;
        this.wood = wood;
        this.stone = stone;
        this.seeds = seeds;
        this.renderRecourses();
    }
    renderRecourses(rounds = 0) {
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
