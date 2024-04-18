import Tent from './tent.js';
import Spring from './spring.js';
import Ranger from './ranger.js';
import { BuildingName } from '../buildingMenu.js';

export default function buildingFactory(buildingType: BuildingName, tileNr: number) {
    return {
        tent: new Tent(tileNr),
        house: new Tent(tileNr),
        spring: new Spring(tileNr),
        ranger: new Ranger(tileNr),
    }[buildingType];
}
