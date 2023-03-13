export enum CharacterTraitsPairsIds {
    HELPFUL_EGOISTIC = 'h_e',
    NICE_NASTY = 'n_n',
    DREAMER_REALIST = 'd_r',
    LOGICAL_EMOTIONAL = 'l_e',
    CALM_IMPULSIVE = 'c_i',
    FEARFUL_COURAGEOUS = 'f_c',
    HAPPY_MELANCHOLIC = 'h_m',
}

export type TCharacterTraitData = {
    id: CharacterTraitsPairsIds;
    name: string;
    opposite: string;
};

export type TCharacterTraitPairLight = {
    [id: string]: {
        mainPercent: number;
        oppositePercent: number;
    };
};

export type TCharacterTraitImpactLight = {
    affectedId: CharacterTraitsPairsIds;
    impact: number;
};

export type TCharacterTraitImpact = {
    pairId: CharacterTraitsPairsIds;
    impacts: TCharacterTraitImpactLight[];
};

export interface ICharacterTraitsImpactsManager {
    getImpactByPairId: (id: string) => TCharacterTraitImpactLight[] | undefined;
    calcPercent: (mainPairPercent: number, impact: TCharacterTraitImpactLight) => number;
}
