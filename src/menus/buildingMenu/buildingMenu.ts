/// <reference path="./buildingMenu.d.ts" />
import { Menu } from '../menu.js';

const buildingMenuData: BuildingMenuItem[] = [
    {
        name: 'tent',
        needs: [{ name: 'wood', amount: 5, emoji: '🌲' }],
        gifts: [
            {
                name: 'population',
                amount: 1,
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
        gifts: [],
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

export class BuildingMenu extends Menu {
    public activeBuilding: BuildingMenuItem | null = null;
    private buildingMenuItems: HTMLElement[] = [];
    private devMode: boolean;

    constructor(dom: HTMLElement, devMode: boolean) {
        super(dom);

        this.devMode = devMode;
    }

    private createDestroyButton() {
        const destroy = document.createElement('div');
        const img = document.createElement('img');
        const name = document.createElement('p');

        destroy.classList.add('building-menu-item');
        name.textContent = 'Destroy';
        img.src = '/assets/imgs/tiles/building/destroy.png';

        destroy.append(name);
        destroy.append(img);

        return destroy;
    }

    public render() {
        const destroy = this.createDestroyButton();
        const buildingMenuItemsDOM = buildingMenuData.map(item => {
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
                destroy.classList.remove('active');
                element.classList.add('active');
                this.activeBuilding = item;
            });

            element.append(name);
            element.append(img);
            element.append(cost);

            return element;
        });
        destroy.addEventListener('click', () => {
            if (destroy.classList.contains('active')) {
                destroy.classList.remove('active');
                this.activeBuilding = null;
                return;
            }

            this.buildingMenuItems.forEach(element => {
                element.classList.remove('active');
            });
            destroy.classList.add('active');
        });

        this.buildingMenuItems = buildingMenuItemsDOM;
        this.dom.append(destroy, ...buildingMenuItemsDOM);
    }

    public deactivateBuilding() {
        this.activeBuilding = null;
        this.buildingMenuItems.forEach(element => {
            element.classList.remove('active');
        });
    }

    public isBuildingActive(): boolean {
        return this.activeBuilding !== null;
    }

    public getActiveBuilding(): BuildingMenuItem | null {
        return buildingMenuData.find(item => item.name === this.activeBuilding?.name) || null;
    }
}
