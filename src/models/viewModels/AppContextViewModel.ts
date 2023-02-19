import { BehaviorSubject, combineLatest } from 'rxjs';
import { getModelByKey } from '../../context';
import { IAppContextViewModel, IAppGeneralSettings, Models } from '../../types';

export class AppContextViewModel implements IAppContextViewModel {
    private _isLoadingSource = new BehaviorSubject(true);
    private _appGeneralSettings = getModelByKey<IAppGeneralSettings>(Models.APP_GENERAL_SETTINGS);

    get theme() {
        return this._appGeneralSettings.appThemeModel.theme;
    }

    get translations() {
        return this._appGeneralSettings.appLangModel.translations;
    }

    get isLoading() {
        return this._isLoadingSource.asObservable();
    }

    constructor() {
        this._subscribeIsLoading();
    }

    public setDefaultValues() {
        this._appGeneralSettings.setDefaultValues();
        return true;
    }

    public setIsLoading(value: boolean) {
        this._isLoadingSource.next(value);
    }

    private _subscribeIsLoading() {
        combineLatest([this.theme, this.translations]).subscribe(([appTheme, lang]) => {
            const isLoading = appTheme && lang;
            this.setIsLoading(!isLoading);
        });
    }
}
