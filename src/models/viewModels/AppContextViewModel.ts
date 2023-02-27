import { BehaviorSubject, combineLatest } from 'rxjs';
import { AppLangs, IAppContextViewModel, IAppGeneralSettings } from '../../types';

/* Main and only source of context app values */
export class AppContextViewModel implements IAppContextViewModel {
    private _isLoading$ = new BehaviorSubject(true);

    constructor(private _appGeneralSettings: IAppGeneralSettings) {
        this._subscribeIsLoading();
    }

    get theme$() {
        return this._appGeneralSettings.appThemeModel.theme;
    }

    get translations$() {
        return this._appGeneralSettings.appLangModel.translations$;
    }

    get isLoading$() {
        return this._isLoading$.asObservable();
    }

    get appLang$() {
        return this._appGeneralSettings.appLangModel.appLang$;
    }

    get appTheme$() {
        return this._appGeneralSettings.appThemeModel.appTheme;
    }

    public setDefaultValues() {
        this._appGeneralSettings.setDefaultValues();
        return true;
    }

    public changeAppLang(lang: AppLangs) {
        this._appGeneralSettings.appLangModel.changeAppLang(lang);
    }

    public setIsLoading(value: boolean) {
        this._isLoading$.next(value);
    }

    public toggleAppTheme() {
        this._appGeneralSettings.appThemeModel.toggleAppTheme();
    }

    private _subscribeIsLoading() {
        combineLatest([this.theme$, this.translations$]).subscribe(([appTheme, lang]) => {
            const isLoading = appTheme && lang;
            this.setIsLoading(!isLoading);
        });
    }
}
