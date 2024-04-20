export abstract class Building {
    abstract readonly url: string;
    public gift(): BuildingNeed[] {
        return [
            {
                name: 'seeds',
                amount: 0,
            },
        ];
    }
}
