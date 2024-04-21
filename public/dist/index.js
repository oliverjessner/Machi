import { BuildingMenu } from './menus/buildingMenu/buildingMenu.js';
import { RecourseMenu } from './menus/recourseMenu/recourseMenu.js';
import { RecourseCollector } from './collectors/recourseCollector.js';
import { Playground } from './playground/playground.js';
import { BuildingFactory } from './buildings/buildingFactory.js';
import config from './config.js';
const playGroundDom = document.querySelector('.playground-tiles');
const buildingMenuElement = document.querySelector('.building-menu');
const recoursesElement = document.querySelector('.recourses-menu');
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
    const target = e.target;
    const tileNr = parseInt(target.dataset.nr || '-1');
    playground.clickTile(tileNr, recourseCollector, buildingMenu);
    recourseMenu.render();
});
setInterval(() => {
    console.log('tick');
    playground.timerTick(recourseCollector);
    recourseMenu.render();
}, config.tickSpeed * 1000);
