declare type RecourseName = 'population' | 'seeds' | 'wood' | 'stone' | 'water' | 'food' | 'money';
declare type emojisData = '👨‍👩‍👧‍👦' | '🌱' | '🌲' | '🪨' | '💧' | '🍞' | '🪙';
declare type BuildingNeed = { name: RecourseName; amount: number };
declare interface ConfigType {
    height: number;
    width: number;
    grass: number;
    trees: number;
    stone: number;
    rivers: number;
    barrels: number;
    tickSpeed: number;
    recourses: {
        [RecourseName]: number;
    };
}
