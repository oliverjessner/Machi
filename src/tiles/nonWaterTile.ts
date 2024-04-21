import { Tile } from './tile.js';
import { randomFromTo } from '../random.js';

export abstract class NonWaterTile extends Tile {
    public addStone(): void {
        const style = getComputedStyle(this.dom).backgroundImage;

        this.dom.style.backgroundImage = `url(/assets/imgs/tiles/stones/stone.png),${style}`;
        this.isEmpty = false;
        this.recourses.push('stone');
    }

    public removeStone(): void {
        this.dom.style.backgroundImage = '';
        this.isEmpty = true;
        this.recourses = this.recourses.filter(recourse => recourse !== 'stone');
    }

    public removeBarrel(): BuildingNeed[] {
        const style = getComputedStyle(this.dom).backgroundImage;
        const whithoutBarrel = style.split(',').filter(item => !item.includes('barrel'));
        const rec1 = randomFromTo(1, 3);
        const rec2 = randomFromTo(1, 3);
        const recources: BuildingNeed[] = [];

        if (rec1 === 1) {
            const randomBetween1And3 = randomFromTo(1, 3);

            recources.push({
                name: 'wood',
                amount: randomBetween1And3,
                emoji: '🌲',
            });
        }
        if (rec1 === 2) {
            const randomBetween1And3 = randomFromTo(1, 3);

            recources.push({
                name: 'money',
                amount: randomBetween1And3,
                emoji: '🪙',
            });
        }
        if (rec1 === 3) {
            const randomBetween1And3 = randomFromTo(1, 3);

            recources.push({
                name: 'seeds',
                amount: randomBetween1And3,
                emoji: '🌱',
            });
        }
        if (rec2 === 1) {
            const randomBetween1And3 = randomFromTo(1, 3);

            recources.push({
                name: 'stone',
                amount: randomBetween1And3,
                emoji: '🪨',
            });
        }
        if (rec2 === 2) {
            const randomBetween1And3 = randomFromTo(1, 3);

            recources.push({
                name: 'food',
                amount: randomBetween1And3,
                emoji: '🍞',
            });
        }
        if (rec2 === 3) {
            const randomBetween1And3 = randomFromTo(1, 3);

            recources.push({
                name: 'water',
                amount: randomBetween1And3,
                emoji: '💧',
            });
        }
        this.dom.style.backgroundImage = whithoutBarrel.join(',');
        this.isEmpty = true;
        this.recourses = this.recourses.filter(recourse => recourse !== 'barrel');

        return recources;
    }

    public addItem(itemName: ItemName): void {
        const style = getComputedStyle(this.dom).backgroundImage;

        this.isEmpty = false;
        this.recourses.push(itemName);
        this.dom.style.backgroundImage = `url(/assets/imgs/tiles/items/${itemName}.png),${style}`;
    }
}
