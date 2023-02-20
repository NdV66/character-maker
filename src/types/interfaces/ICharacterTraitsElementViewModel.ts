import { Observable } from 'rxjs';
import { TCharacterTraitValue } from '../characterTraits';
import { ICharacterTraitsPair } from './ICharacterTraitsPair';

export interface ICharacterTraitsElementViewModel {
    data$: Observable<TCharacterTraitValue>;
    characterTraitsPairs: ICharacterTraitsPair[];

    updatePairPercentById: (id: string, value: number) => void;
}
