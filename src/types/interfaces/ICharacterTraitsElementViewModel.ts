import { Observable } from 'rxjs';
import { TCharacterTraitValue } from '../characterTraits';
import { TTranslations } from '../langs';
import { TTheme } from '../theme';
import { ICharacterTraitsPair } from './ICharacterTraitsPair';

export interface ICharacterTraitsElementViewModel {
    data$: Observable<TCharacterTraitValue>;
    translations$: Observable<TTranslations>;
    theme$: Observable<TTheme>;
    characterTraitsPairs: ICharacterTraitsPair[];

    updatePairPercentById: (id: string, value: number) => void;
}