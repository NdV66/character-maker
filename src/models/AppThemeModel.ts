import { AppTheme } from '../types';
import { map, connect, firstValueFrom, ReplaySubject } from 'rxjs';

import { DARK_THEME, LIGHT_THEME } from '../styles';
import { DEFAULTS, COOKIE_THEME_KEY } from '../defaults';
import { getFromCookies, getNewAppTheme, setCookie } from '../services';

export const selectTheme = (theme: AppTheme) => (theme === AppTheme.DARK ? DARK_THEME : LIGHT_THEME);

export class AppThemeModel {
    private _appThemeSubject = new ReplaySubject<AppTheme>(1);

    public appTheme = this._appThemeSubject.pipe(connect(() => this._appThemeSubject));
    public theme = this.appTheme.pipe(map(selectTheme));

    constructor() {
        this._saveAppThemeInCookieOnChange();
    }

    private _saveAppThemeInCookieOnChange() {
        this.appTheme.subscribe((value) => setCookie(COOKIE_THEME_KEY, value));
    }

    public setDefaultValue = () => {
        const savedTheme = getFromCookies<AppTheme>(COOKIE_THEME_KEY);
        this._appThemeSubject.next(savedTheme || DEFAULTS.APP_THEME);
    };

    public toggleAppTheme = async () => {
        const currentTheme = await firstValueFrom(this._appThemeSubject);
        const newTheme = getNewAppTheme(currentTheme);
        this._appThemeSubject.next(newTheme);
    };
}
