/// <reference path="../../global.d.ts" />
/// <reference path="../../buildings/building.d.ts" />

declare type BuildingMenuItem = {
    name: BuildingName;
    needs: BuildingNeed[];
    gifts: BuildingNeed[];
    generate?: { name: string; amount: number; max: number; rounds: number }[];
};
