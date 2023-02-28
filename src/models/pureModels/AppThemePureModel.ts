import { AppTheme, IAppThemePure } from '../../types';
import { DEFAULTS, COOKIE_THEME_KEY } from '../../defaults';
import { getFromCookies, setCookie } from '../../services';
import { DARK_THEME, LIGHT_THEME } from '../../styles';

export class AppThemePureModel implements IAppThemePure {
    private _appTheme = DEFAULTS.APP_THEME;

    get appTheme() {
        return this._appTheme;
    }

    public setDefaultValue = () => {
        const savedTheme = getFromCookies<AppTheme>(COOKIE_THEME_KEY);
        const lang = savedTheme || DEFAULTS.APP_THEME;
        this._appTheme = lang;
    };

    public setAppTheme = (value: AppTheme) => {
        this._appTheme = value;
        setCookie(COOKIE_THEME_KEY, value);
    };

    public getNewAppTheme(appTheme: AppTheme) {
        return appTheme === AppTheme.DARK ? AppTheme.LIGHT : AppTheme.DARK;
    }

    //TODO: tests
    public getTheme(theme: AppTheme) {
        return theme === AppTheme.DARK ? DARK_THEME : LIGHT_THEME;
    }
}
