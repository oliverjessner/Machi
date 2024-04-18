import Playground from './playground.js';
import { Recourses } from './recourses.js';
import Events from './events.js';
import { BuildingMenu } from './buildingMenu.js';
import Timer from './timer.js';

const config: ConfigType = {
    height: 10,
    width: 10,
    grass: 85,
    trees: 20,
    stone: 10,
    rivers: 2,
    timer: 10,
};
const recourses = new Recourses();
const buildingMenu = new BuildingMenu();
const events = new Events(recourses);
const timer = new Timer(config.timer);
const playground = new Playground(config, recourses);

buildingMenu.renderBuildingMenu();
recourses.renderRecourseMenu();
playground.generatePlaygroundOnDOM();
playground.generatRandomGrass(config.grass);
playground.generateRivers(config.rivers);
playground.generatRandomTrees(config.trees, true);
playground.generateRandomStones(config.stone);

timer.add(function () {
    const items = buildingMenu.producAll();
    buildingMenu.createAll(recourses, playground.environmentEvents());

    console.log(items);
    recourses.add(items);
    recourses.renderRecourses();
});
timer.startTimer();
playground.click(function (event: Event) {
    const clickedElement = event.target as HTMLElement;
    const nr = parseInt(clickedElement.dataset.nr || '-1');

    if (clickedElement && nr !== -1) {
        playground.clickOnTile(nr, buildingMenu);
        events.checkEvent(playground);
    }
});
