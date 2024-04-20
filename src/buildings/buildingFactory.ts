/// <reference path="building.d.ts" />
import { Building } from './building.js';
import { Tent } from './tent.js';
import { Spring } from './spring.js';
import { Ranger } from './ranger.js';

export class BuildingFactory {
    private static buildings: Building[] = [];

    public generate(buildingType: BuildingName): Building {
        const building = {
            tent: new Tent(),
            spring: new Spring(),
            ranger: new Ranger(),
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
