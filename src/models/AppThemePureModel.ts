import { AppTheme, IAppThemePure } from '../types';
import { DEFAULTS, COOKIE_THEME_KEY } from '../defaults';
import { getFromCookies, setCookie } from '../services';

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
}
