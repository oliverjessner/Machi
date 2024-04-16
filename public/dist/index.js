import Playground from './playground.js';
const config = {
    height: 10,
    width: 10,
    grass: 85,
    trees: 20,
    stone: 10,
    rivers: 2,
};
const playgroundDOM = document.querySelector('main');
const playground = new Playground(config.width, config.height, playgroundDOM);
playground.generatePlaygroundOnDOM();
playground.generatRandomGrass(config.grass);
playground.generateRivers(config.rivers);
playground.generatRandomTrees(config.trees);
playground.generateRandomStones(config.stone);
playgroundDOM.addEventListener('click', function (event) {
    const clickedElement = event.target;
    const nr = parseInt(clickedElement.dataset.nr || '-1');
    if (clickedElement && nr !== -1) {
        playground.clickOnTile(nr);
    }
});
