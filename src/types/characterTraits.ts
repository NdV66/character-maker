export enum CharacterTraitsPairsIds {
    HELPFUL_EGOISTIC = 'h_e',
    NICE_NASTY = 'n_n',
    DREAMER_REALIST = 'd_r',
    LOGICAL_EMOTIONAL = 'l_e',
    CALM_IMPULSIVE = 'c_i',
    FEARFUL_COURAGEOUS = 'f_c',
    LOVING_HATEFUL = 'l_h',
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

export type TCharacterTraitImpact = {
    id: CharacterTraitsPairsIds;
    affectedId: CharacterTraitsPairsIds;
    impact: number;
};
