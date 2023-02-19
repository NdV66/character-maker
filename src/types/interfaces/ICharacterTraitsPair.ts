import { ICharacterTrait } from './ICharacterTrait';

export interface ICharacterTraitsPair {
    id: string;
    mainCharacterTrait: ICharacterTrait;
    oppositeCharacterTrait: ICharacterTrait;

    reset: () => void;
    setPercentForMainCharacterTrait: (percent: number) => void;
}
