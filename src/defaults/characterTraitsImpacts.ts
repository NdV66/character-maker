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
];
