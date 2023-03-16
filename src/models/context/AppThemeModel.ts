import { map, firstValueFrom, BehaviorSubject, Observable } from 'rxjs';
import { AppTheme, IAppThemePure, IAppTheme, TTheme } from '../../types';

export class AppThemeModel implements IAppTheme {
    private _appTheme$: BehaviorSubject<AppTheme>;
    private _theme$: Observable<TTheme>;

    constructor(private _appThemePureModel: IAppThemePure) {
        this._appTheme$ = new BehaviorSubject<AppTheme>(_appThemePureModel.appTheme);
        this._theme$ = this._appTheme$.pipe(map(this._mapToTheme));

        this._saveAppThemeInCookieOnChange();
    }

    get appTheme$() {
        return this._appTheme$.asObservable();
    }

    get theme$() {
        return this._theme$;
    }

    private _mapToTheme = (value: AppTheme) => this._appThemePureModel.getTheme(value);

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
