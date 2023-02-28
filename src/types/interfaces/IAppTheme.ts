import { Observable } from 'rxjs';
import { AppTheme } from '../appTheme';
import { TTheme } from '../theme';

export interface IAppTheme {
    appTheme$: Observable<AppTheme>;
    theme$: Observable<TTheme>;

    setDefaultValue: () => void;
    toggleAppTheme: () => void;
}

export interface IAppThemePure {
    appTheme: AppTheme;

    setDefaultValue: () => void;
    changeAppTheme: (value: AppTheme) => void;
    getNewAppTheme: (appTheme: AppTheme) => AppTheme;
    getTheme: (theme: AppTheme) => TTheme;
}
