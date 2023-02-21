import { Observable } from 'rxjs';
import { AppTheme } from '../appTheme';
import { TTranslations } from '../langs';

export interface IThemeButtonElementViewModel {
    appTheme$: Observable<AppTheme>;
    translations$: Observable<TTranslations>;

    toggleAppTheme: () => void;
}
