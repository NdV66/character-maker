import { ICharacterTrait } from './interfaces';

export type TCharacterTraitData = {
    id: string;
    name: string;
    opposite: string;
};

export type TCharacterTraitPairValue = {
    [id: string]: {
        main: ICharacterTrait;
        opposite: ICharacterTrait;
    };
};
