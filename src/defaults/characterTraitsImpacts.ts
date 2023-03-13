import { CharacterTraitsPairsIds, TCharacterTraitImpact } from '../types';

export const CHARACTER_TRAITS_IMPACTS: TCharacterTraitImpact[] = [
    {
        pairId: CharacterTraitsPairsIds.LOGICAL_EMOTIONAL,
        impacts: [
            {
                affectedId: CharacterTraitsPairsIds.DREAMER_REALIST,
                impact: 1.5,
            },
            {
                affectedId: CharacterTraitsPairsIds.CALM_IMPULSIVE,
                impact: 1.1,
            },
        ],
    },
    {
        pairId: CharacterTraitsPairsIds.HAPPY_MELANCHOLIC,
        impacts: [
            {
                affectedId: CharacterTraitsPairsIds.DREAMER_REALIST,
                impact: 0.9,
            },
        ],
    },
    {
        pairId: CharacterTraitsPairsIds.DREAMER_REALIST,
        impacts: [
            {
                affectedId: CharacterTraitsPairsIds.HELPFUL_EGOISTIC,
                impact: 1.3,
            },
        ],
    },
    {
        pairId: CharacterTraitsPairsIds.CALM_IMPULSIVE,
        impacts: [
            {
                affectedId: CharacterTraitsPairsIds.LOGICAL_EMOTIONAL,
                impact: 1.5,
            },
        ],
    },
    {
        pairId: CharacterTraitsPairsIds.FEARFUL_COURAGEOUS,
        impacts: [
            {
                affectedId: CharacterTraitsPairsIds.CALM_IMPULSIVE,
                impact: 0.7,
            },
        ],
    },
    {
        pairId: CharacterTraitsPairsIds.HELPFUL_EGOISTIC,
        impacts: [
            {
                affectedId: CharacterTraitsPairsIds.NICE_NASTY,
                impact: 1.5,
            },
        ],
    },
    {
        pairId: CharacterTraitsPairsIds.NICE_NASTY,
        impacts: [
            {
                affectedId: CharacterTraitsPairsIds.HELPFUL_EGOISTIC,
                impact: 1.1,
            },
        ],
    },
];
