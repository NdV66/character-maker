import { map, connect, firstValueFrom, ReplaySubject, Observable } from 'rxjs';
import { AppTheme, IAppThemePure, IAppTheme, TTheme } from '../../types';

export class AppThemeModel implements IAppTheme {
    private _appThemeSubject = new ReplaySubject<AppTheme>(1);
    public readonly appTheme$ = this._appThemeSubject.pipe(connect(() => this._appThemeSubject));
    public readonly theme$: Observable<TTheme>;

    constructor(private _appThemePureModel: IAppThemePure) {
        this.theme$ = this.appTheme$.pipe(map((value) => this._appThemePureModel.getTheme(value))); //TODO: tests
        this._saveAppThemeInCookieOnChange();
    }

    private _updateAppThemeSubject() {
        this._appThemeSubject.next(this._appThemePureModel.appTheme);
    }

    //TODO: tests
    private _saveAppThemeInCookieOnChange() {
        this.appTheme$.subscribe((value) => this._appThemePureModel.changeAppTheme(value));
    }

    //TODO: tests
    public setDefaultValue = () => {
        this._appThemePureModel.setDefaultValue();
        this._updateAppThemeSubject();
    };

    //TODO: tests
    public toggleAppTheme = async () => {
        const currentTheme = await firstValueFrom(this._appThemeSubject);
        const newTheme = this._appThemePureModel.getNewAppTheme(currentTheme);

        this._appThemePureModel.changeAppTheme(newTheme);
        this._updateAppThemeSubject();
    };
}
