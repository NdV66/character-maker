import { Observable } from 'rxjs';
import { AppTheme } from '../appTheme';
import { TTranslations } from '../langs';
import { TTheme } from '../theme';

export interface IPageViewModel {
    translations$: Observable<TTranslations>;
    theme$: Observable<TTheme>;
    appTheme$: Observable<AppTheme>;
    isLoading$: Observable<boolean>;

    setDefaultValues: () => void;
}
