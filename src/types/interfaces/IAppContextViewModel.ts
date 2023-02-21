import { Observable } from 'rxjs';
import { AppTheme } from '../appTheme';
import { AppLangs, TTranslations } from '../langs';
import { TTheme } from '../theme';

export interface IAppContextViewModel {
    theme$: Observable<TTheme>;
    appTheme$: Observable<AppTheme>;
    translations$: Observable<TTranslations>;
    isLoading$: Observable<boolean>;
    appLang$: Observable<AppLangs>;

    setDefaultValues: () => boolean;
    setIsLoading: (value: boolean) => void;
    changeAppLang: (lang: AppLangs) => void;
    toggleAppTheme: () => void;
}
