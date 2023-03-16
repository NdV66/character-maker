import { map, connect, firstValueFrom, Observable, BehaviorSubject } from 'rxjs';
import { AppTheme, IAppThemePure, IAppTheme, TTheme } from '../../types';

export class AppThemeModel implements IAppTheme {
    private _appTheme$: BehaviorSubject<AppTheme>;
    public readonly appTheme$: Observable<AppTheme>;
    public readonly theme$: Observable<TTheme>;

    constructor(private _appThemePureModel: IAppThemePure) {
        this._appTheme$ = new BehaviorSubject<AppTheme>(_appThemePureModel.appTheme); //TODO: tests
        this.appTheme$ = this._appTheme$.pipe(connect(() => this._appTheme$)); //TODO: tests
        this.theme$ = this.appTheme$.pipe(map((value) => this._appThemePureModel.getTheme(value))); //TODO: tests

        this._saveAppThemeInCookieOnChange();
    }

    private _updateAppThemeSubject() {
        this._appTheme$.next(this._appThemePureModel.appTheme);
    }

    private _saveAppThemeInCookieOnChange() {
        this._appTheme$.subscribe((value) => this._appThemePureModel.changeAppTheme(value));
    }

    public setDefaultValue = () => {
        this._appThemePureModel.setDefaultValue();
        this._updateAppThemeSubject();
    };

    public toggleAppTheme = async () => {
        const currentTheme = await firstValueFrom(this._appTheme$);
        const newTheme = this._appThemePureModel.getNewAppTheme(currentTheme);

        this._appThemePureModel.changeAppTheme(newTheme);
        this._updateAppThemeSubject();
    };
}
