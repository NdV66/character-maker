import { ICharacterTraitsPair } from '../../types';

export const characterTraitsManagerMock = (characterTraitsPairs: ICharacterTraitsPair[] = []) => ({
    characterTraitsPairs,

    resetAll: jest.fn(),
    updatePairPercentById: jest.fn(),
});
