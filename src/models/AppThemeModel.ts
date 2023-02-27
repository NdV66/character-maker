import { AppTheme, IAppThemePure } from '../types';
import { map, connect, firstValueFrom, ReplaySubject } from 'rxjs';
import { DARK_THEME, LIGHT_THEME } from '../styles';
import { getNewAppTheme } from '../services';
import { IAppTheme } from '../types';

export const selectTheme = (theme: AppTheme) => (theme === AppTheme.DARK ? DARK_THEME : LIGHT_THEME);

export class AppThemeModel implements IAppTheme {
    private _appThemeSubject = new ReplaySubject<AppTheme>(1);

    public appTheme = this._appThemeSubject.pipe(connect(() => this._appThemeSubject));
    public theme = this.appTheme.pipe(map(selectTheme));

    constructor(private _appThemePureModel: IAppThemePure) {
        this._saveAppThemeInCookieOnChange();
    }

    private _updateAppThemeSubject() {
        this._appThemeSubject.next(this._appThemePureModel.appTheme);
    }

    private _saveAppThemeInCookieOnChange() {
        this.appTheme.subscribe((value) => this._appThemePureModel.setAppTheme(value));
    }

    public setDefaultValue = () => {
        this._appThemePureModel.setDefaultValue();
        this._updateAppThemeSubject();
    };

    public toggleAppTheme = async () => {
        const currentTheme = await firstValueFrom(this._appThemeSubject);
        const newTheme = getNewAppTheme(currentTheme);

        this._appThemePureModel.setAppTheme(newTheme);
        this._updateAppThemeSubject();
    };
}
