import { BuildingMenu } from './menus/buildingMenu/buildingMenu.js';
import { RecourseMenu } from './menus/recourseMenu/recourseMenu.js';
import { RecourseCollector } from './collectors/recourseCollector.js';
import { Playground } from './playground/playground.js';
import { BuildingFactory } from './buildings/buildingFactory.js';
import { Building } from './buildings/building.js';
import config from './config.js';

const playGroundDom = document.querySelector('.playground-tiles') as HTMLElement;
const buildingMenuElement = document.querySelector('.building-menu') as HTMLElement;
const recoursesElement = document.querySelector('.recourses-menu') as HTMLElement;
const devMode = document.querySelector('body')?.getAttribute('dev') === 'true';
const buildingFactory = new BuildingFactory();
const recourseCollector = new RecourseCollector(config);
const buildingMenu = new BuildingMenu(buildingMenuElement, devMode);
const recourseMenu = new RecourseMenu(recoursesElement, recourseCollector, devMode);
const playground = new Playground(config, playGroundDom, devMode);

if (devMode) {
    console.log(config);
    console.log(recourseCollector.getAll());
}

recourseMenu.render();
buildingMenu.render();
playground.render();

playGroundDom.addEventListener('click', e => {
    const target = e.target as HTMLElement;
    const tileNr = parseInt(target.dataset.nr || '-1');

    playground.clickTile(tileNr, recourseCollector, buildingMenu);
    recourseMenu.render();
});
setInterval(() => {
    console.log('tick');
    playground.timerTick(recourseCollector);
    recourseMenu.render();
}, config.tickSpeed * 1000);
