import { Observable } from 'rxjs';
import { AppTheme } from '../appTheme';
import { TTranslations } from '../langs';
import { TTheme } from '../theme';

export interface IThemeButtonElementViewModel {
    appTheme$: Observable<AppTheme>;
    translations$: Observable<TTranslations>;
    theme$: Observable<TTheme>;

    toggleAppTheme: () => void;
}
