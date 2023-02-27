import { Observable } from 'rxjs';
import { AppTheme } from '../appTheme';
import { TTheme } from '../theme';

export interface IAppTheme {
    appTheme: Observable<AppTheme>;
    theme: Observable<TTheme>;

    setDefaultValue: () => void;
    toggleAppTheme: () => void;
}

export interface IAppThemePure {
    appTheme: AppTheme;

    setDefaultValue: () => void;
    setAppTheme: (value: AppTheme) => void;
}
