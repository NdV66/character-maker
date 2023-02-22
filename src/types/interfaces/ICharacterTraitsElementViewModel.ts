import { Observable } from 'rxjs';
import { TCharacterTraitPairLight } from '../characterTraits';
import { TTranslations } from '../langs';
import { TTheme } from '../theme';
import { ICharacterTraitsPair } from './ICharacterTraitsPair';

export interface ICharacterTraitsElementViewModel {
    data$: Observable<TCharacterTraitPairLight>;
    translations$: Observable<TTranslations>;
    theme$: Observable<TTheme>;
    characterTraitsPairs: ICharacterTraitsPair[];

    updatePairPercentById: (id: string, value: number) => void;
}
