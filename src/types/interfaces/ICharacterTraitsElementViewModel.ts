import { Observable } from 'rxjs';
import { TCharacterTraitValue } from '../characterTraits';
import { ICharacterTraitsPair } from './ICharacterTraitsPair';

export interface ICharacterTraitsElementViewModel {
    dataSource: Observable<TCharacterTraitValue>;
    characterTraitsPairs: ICharacterTraitsPair[];

    updatePairPercentById: (id: string, value: number) => void;
}
