import { CharacterTraitsPairsIds, TCharacterTraitImpact } from '../types';

export const CHARACTER_TRAITS_IMPACTS: TCharacterTraitImpact[] = [
    {
        pairId: CharacterTraitsPairsIds.HELPFUL_EGOISTIC,
        impacts: [
            {
                affectedId: CharacterTraitsPairsIds.NICE_NASTY,
                impact: 0.8,
            },
            {
                affectedId: CharacterTraitsPairsIds.DREAMER_REALIST,
                impact: 1.2,
            },
        ],
    },
    {
        pairId: CharacterTraitsPairsIds.NICE_NASTY,
        impacts: [
            {
                affectedId: CharacterTraitsPairsIds.HELPFUL_EGOISTIC,
                impact: 0.5,
            },
            {
                affectedId: CharacterTraitsPairsIds.DREAMER_REALIST,
                impact: 1.1,
            },
        ],
    },
];
