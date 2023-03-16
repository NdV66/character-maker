import { AppTheme, IAppThemePure, ICookiesManager } from '../../types';
import { DEFAULTS, COOKIE_THEME_KEY } from '../../defaults';
import { DARK_THEME, LIGHT_THEME } from '../../styles';

export class AppThemePureModel implements IAppThemePure {
    private _appTheme = DEFAULTS.APP_THEME;

    constructor(private _cookiesManager: ICookiesManager) {
        this.setDefaultValue();
    }

    get appTheme() {
        return this._appTheme;
    }

    public setDefaultValue = () => {
        const savedTheme = this._cookiesManager.getFromCookies<AppTheme>(COOKIE_THEME_KEY);
        const theme = savedTheme || DEFAULTS.APP_THEME;
        this.changeAppTheme(theme);
    };

    public changeAppTheme = (value: AppTheme) => {
        this._appTheme = value;
        this._cookiesManager.setCookie(COOKIE_THEME_KEY, value);
    };

    public getNewAppTheme(appTheme: AppTheme) {
        return appTheme === AppTheme.DARK ? AppTheme.LIGHT : AppTheme.DARK;
    }

    public getTheme(theme: AppTheme) {
        return theme === AppTheme.DARK ? DARK_THEME : LIGHT_THEME;
    }
}
