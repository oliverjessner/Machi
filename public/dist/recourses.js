const recoursesEmojisData = ['🕣', '👨‍👩‍👧‍👦', '🌱', '🌲', '🪨', '💧', '🍔', '💎'];
const recoursesData = ['rounds', 'population', 'seeds', 'wood', 'stone', 'water', 'food', 'diamonds'];
const recoursesDOM = document.querySelector('header nav ul');
const fallBackRecourses = { rounds: 0, population: 0, seeds: 0, wood: 0, stone: 0, water: 0, food: 0, diamonds: 0 };
export class Recourses {
    populationDOM;
    waterDOM;
    diamondsDOM;
    foodDOM;
    woodDOM;
    stoneDOM;
    seedsDOM;
    roundsDOM;
    constructor(recs = fallBackRecourses) {
        const recsDir = Object.entries(recs);
        const recoursesDOMElements = recoursesData.map((recourse, i) => {
            const li = document.createElement('li');
            const span = document.createElement('span');
            li.innerText = `${recoursesEmojisData[i]} `;
            span.textContent = recsDir[i]?.[1] + '';
            li.id = recourse;
            li.append(span);
            return li;
        });
        recoursesDOM.append(...recoursesDOMElements);
        recsDir.forEach(([key, value]) => {
            this[key] = value;
        });
        this.populationDOM = document.querySelector('#population span');
        this.waterDOM = document.querySelector('#water span');
        this.diamondsDOM = document.querySelector('#diamonds span');
        this.foodDOM = document.querySelector('#food span');
        this.woodDOM = document.querySelector('#wood span');
        this.stoneDOM = document.querySelector('#stone span');
        this.seedsDOM = document.querySelector('#seeds span');
        this.roundsDOM = document.querySelector('#rounds span');
    }
    renderRecourses(rounds = 0) {
        this.populationDOM.textContent = this.population + '';
        this.waterDOM.textContent = this.water + '';
        this.diamondsDOM.textContent = this.diamonds + '';
        this.foodDOM.textContent = this.food + '';
        this.woodDOM.textContent = this.wood + '';
        this.stoneDOM.textContent = this.stone + '';
        this.seedsDOM.textContent = this.seeds + '';
        this.roundsDOM.textContent = rounds + '';
    }
    subtract(recourses) {
        recourses.forEach(rec => {
            this[rec.name] -= rec.amount;
        });
    }
    add(recourses) {
        recourses.forEach((rec) => {
            this[rec.name] += rec.amount;
        });
    }
}
