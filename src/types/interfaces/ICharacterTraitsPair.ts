import { ICharacterTrait } from './ICharacterTrait';

export interface ICharacterTraitsPair {
    id: string;
    mainCharacterTrait: ICharacterTrait;
    oppositeCharacterTrait: ICharacterTrait;
    percent: number;

    reset: () => void;
    setPercentForMainCharacterTrait: (percent: number) => void;
}
