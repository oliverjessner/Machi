/// <reference path="building.d.ts" />
import { Building } from './building.js';
import { Tent } from './tent.js';
import { Spring } from './spring.js';
import { Ranger } from './ranger.js';
import { Farm } from './farm.js';
import { Mine } from './mine.js';

export class BuildingFactory {
    private static buildings: Building[] = [];

    public generate(buildingType: BuildingName, tileNr: number): Building {
        const building = {
            tent: new Tent(tileNr),
            spring: new Spring(tileNr),
            ranger: new Ranger(tileNr),
            farm: new Farm(tileNr),
            mine: new Mine(tileNr),
        }[buildingType];

        if (!building) {
            throw new Error('Unknown building type');
        }

        BuildingFactory.buildings.push(building);

        return building;
    }

    public remove(building: Building): void {
        BuildingFactory.buildings = BuildingFactory.buildings.filter(b => b !== building);
    }

    public getAll(): Building[] {
        return BuildingFactory.buildings;
    }
}
