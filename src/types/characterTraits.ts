export type TCharacterTraitData = {
    id: string;
    name: string;
    opposite: string;
};

export type TCharacterTraitPairLight = {
    [id: string]: {
        mainPercent: number;
        oppositePercent: number;
    };
};
