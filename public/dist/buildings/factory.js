import Tent from './tent.js';
import Spring from './spring.js';
import Ranger from './ranger.js';
export default function buildingFactory(buildingType, tileNr) {
    return {
        tent: new Tent(tileNr),
        house: new Tent(tileNr),
        spring: new Spring(tileNr),
        ranger: new Ranger(tileNr),
    }[buildingType];
}
