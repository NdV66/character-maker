import { map, firstValueFrom, BehaviorSubject } from 'rxjs';
import { AppTheme, IAppThemePure, IAppTheme } from '../../types';

export class AppThemeModel implements IAppTheme {
    private _appTheme$: BehaviorSubject<AppTheme>;

    constructor(private _appThemePureModel: IAppThemePure) {
        this._appTheme$ = new BehaviorSubject<AppTheme>(_appThemePureModel.appTheme);
        this._saveAppThemeInCookieOnChange();
    }

    get appTheme$() {
        return this._appTheme$.asObservable();
    }

    get theme$() {
        return this._appTheme$.pipe(map(this._mapToTheme));
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
