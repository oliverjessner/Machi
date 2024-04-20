export class RecourseCollector {
    [key: RecourseName]: number;

    constructor(config: ConfigType) {
        const entries = Object.entries(config.recourses) as [[RecourseName, number]];

        entries.forEach(([name, amount]: [RecourseName, number]) => {
            this[name] = amount;
        });
    }

    public subtract(recourses: BuildingNeed[]): void {
        recourses.forEach(rec => {
            this[rec.name] -= rec.amount;
        });
    }

    public add(recourses: BuildingNeed[]): void {
        recourses.forEach(rec => {
            this[rec.name] += rec.amount;
        });
    }

    public getAll(): BuildingNeed[] {
        return Object.entries(this).map(([name, amount]) => ({ name: name as RecourseName, amount }));
    }
}
