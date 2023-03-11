import { Observable } from 'rxjs';
import { TTranslations } from '../langs';
import { TTheme } from '../theme';

export interface IChangeAppModeElementViewModel {
    translations$: Observable<TTranslations>;
    theme$: Observable<TTheme>;
    isFreeHandMode$: Observable<boolean>;

    toggleIsFreeHandMode: () => Promise<void>;
}
