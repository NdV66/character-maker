import { CharacterTraitsPairsIds, TCharacterTraitImpact } from '../../types';
import { characterTraitModelMock } from './characterTraitModelMock';
import { characterTraitsPairModelMock } from './characterTraitsPairModelMock';

export const characterTrait = characterTraitModelMock('1', 'key1', 20);
export const oppositeCharacterTrait = characterTraitModelMock('2', 'key2', 80);
export const mainPair = characterTraitsPairModelMock('mainPairId', characterTrait, oppositeCharacterTrait);

export const characterTrait_impact = characterTraitModelMock('1', 'key11', 60);
export const oppositeCharacterTrait_impact = characterTraitModelMock('2', 'key22', 40);
export const impactPair = characterTraitsPairModelMock(
    'affectedPairId',
    characterTrait_impact,
    oppositeCharacterTrait_impact,
);

export const traitPairs = [mainPair, impactPair];

export const impactMock = {
    pairId: mainPair.id as CharacterTraitsPairsIds,
    impacts: [
        {
            affectedId: impactPair.id as CharacterTraitsPairsIds,
            impact: 0.5,
        },
    ],
};
export const impactsMocks: TCharacterTraitImpact[] = [impactMock];
