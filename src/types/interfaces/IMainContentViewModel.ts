import { Observable } from 'rxjs';
import { TTranslations } from '../langs';
import { TTheme } from '../theme';

export interface IMainContentViewModel {
    translations$: Observable<TTranslations>;
    theme$: Observable<TTheme>;
}
