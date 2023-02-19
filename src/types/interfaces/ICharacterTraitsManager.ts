import { ICharacterTraitsPair } from './ICharacterTraitsPair';

export interface ICharacterTraitsManager {
    characterTraitsPairs: ICharacterTraitsPair[];

    resetAll: () => void;
    updatePairPercentById: (pairId: string, percent: number) => boolean;
}
