import Playground from './playground.js';
import { Recourses } from './recourses.js';
import Events from './events.js';
import { BuildingMenu } from './buildingMenu.js';

const config = {
    height: 10,
    width: 10,
    grass: 85,
    trees: 20,
    stone: 10,
    rivers: 2,
};
const recourses = new Recourses();
const buildingMenu = new BuildingMenu();
const events = new Events(recourses);
const playground = new Playground(config.width, config.height, recourses);

buildingMenu.renderBuildingMenu();
playground.generatePlaygroundOnDOM();
playground.generatRandomGrass(config.grass);
playground.generateRivers(config.rivers);
playground.generatRandomTrees(config.trees);
playground.generateRandomStones(config.stone);

playground.click(function (event: Event) {
    const clickedElement = event.target as HTMLElement;
    const nr = parseInt(clickedElement.dataset.nr || '-1');

    if (clickedElement && nr !== -1) {
        playground.clickOnTile(nr, buildingMenu);
        events.checkEvent(playground);
    }
});
