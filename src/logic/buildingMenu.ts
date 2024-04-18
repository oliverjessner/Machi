import { RecoursesType, RecoursesEmojisType, Recourses } from './recourses.js';
import Building from './buildings/building.js';
import buildingFactory from './buildings/factory.js';
import Grass from './tiles/grass.js';

export type BuildingName = 'tent' | 'ranger' | 'house' | 'spring';
export type BuildingNeed = { name: RecoursesType; amount: number; emoji: RecoursesEmojisType };
export type BuildingMenuItem = {
    name: BuildingName;
    needs: BuildingNeed[];
    gifts: BuildingNeed[];
    generate?: { name: string; amount: number; max: number; rounds: number }[];
};

export class BuildingMenu {
    private activeBuildings: Building[] = [];
    private buildingMenuDOM = document.querySelector('footer') as HTMLElement;
    private buildingMenuItems: HTMLElement[] = [];
    private buildingMenuItemsData: BuildingMenuItem[] = [
        {
            name: 'tent',
            needs: [{ name: 'wood', amount: 5, emoji: '🌲' }],
            gifts: [
                {
                    name: 'population',
                    amount: 2,
                    emoji: '👨‍👩‍👧‍👦',
                },
                {
                    name: 'seeds',
                    amount: 1,
                    emoji: '🌱',
                },
            ],
        },
        {
            name: 'spring',
            needs: [
                { name: 'stone', amount: 3, emoji: '🪨' },
                {
                    name: 'wood',
                    amount: 1,
                    emoji: '🌲',
                },
            ],
            gifts: [
                {
                    name: 'water',
                    amount: 1,
                    emoji: '💧',
                },
            ],
        },
        {
            name: 'ranger',
            needs: [
                { name: 'wood', amount: 3, emoji: '🌲' },
                {
                    name: 'stone',
                    amount: 3,
                    emoji: '🪨',
                },
                {
                    name: 'seeds',
                    amount: 10,
                    emoji: '🌱',
                },
            ],
            gifts: [{ name: 'population', amount: 1, emoji: '👨‍👩‍👧‍👦' }],
            generate: [
                {
                    name: 'tree',
                    amount: 1,
                    max: 3,
                    rounds: 1,
                },
            ],
        },
    ];
    private activeBuilding: BuildingMenuItem | null = null;

    public renderBuildingMenu(): void {
        const buildingMenuItemsDOM = this.buildingMenuItemsData.map(item => {
            const element = document.createElement('div');
            const img = document.createElement('img');
            const name = document.createElement('p');
            const cost = document.createElement('p');

            name.textContent = item.name.charAt(0).toUpperCase() + item.name.slice(1);
            cost.textContent = item.needs.map((need: BuildingNeed) => `${need.emoji} ${need.amount} `).join(' ');
            img.src = `/assets/imgs/tiles/building/${item.name}.png`;

            element.classList.add('building-menu-item');
            element.addEventListener('click', () => {
                if (element.classList.contains('active')) {
                    element.classList.remove('active');
                    this.activeBuilding = null;
                    return;
                }

                this.buildingMenuItems.forEach(element => {
                    element.classList.remove('active');
                });
                element.classList.add('active');
                this.activeBuilding = item;
            });
            element.append(name);
            element.append(img);
            element.append(cost);

            return element;
        });
        this.buildingMenuItems = buildingMenuItemsDOM;
        this.buildingMenuDOM.append(...buildingMenuItemsDOM);
    }

    public makeBuildingSelectInactive(): void {
        this.buildingMenuItems.forEach(element => {
            element.classList.remove('active');
        });
        this.activeBuilding = null;
    }

    public getActiveBuilding(): BuildingMenuItem | null {
        return this.activeBuilding;
    }

    public costOfNextBuilding(): BuildingMenuItem {
        return this.activeBuilding as BuildingMenuItem;
    }

    public addBuilding(buildingName: BuildingName, tile: Grass) {
        const building = buildingFactory(buildingName, tile.cellNr);

        this.activeBuildings.push(building);
        tile.addBuilding(buildingName);
        new Audio('/assets/audio/build.wav').play();
    }

    public getActiveBuildings(): Building[] {
        return this.activeBuildings;
    }

    public producAll() {
        return this.activeBuildings.map(building => building.produce());
    }

    public createAll(recourses: Recourses, events: Object) {
        this.activeBuildings.forEach(function (building) {
            const valid = building.create(recourses);

            if (valid && events[building.name]) {
                return events[building.name]();
            }
        });
    }
}
