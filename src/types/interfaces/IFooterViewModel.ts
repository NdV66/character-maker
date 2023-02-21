import { Observable } from 'rxjs';
import { TTranslations } from '../langs';
import { TTheme } from '../theme';

export interface IFooterViewModel {
    theme$: Observable<TTheme>;
    translations$: Observable<TTranslations>;
    version: string;
}
