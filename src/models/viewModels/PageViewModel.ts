import { IPageViewModel, IAppContextViewModel } from '../../types';

export class PageViewModel implements IPageViewModel {
    constructor(private _appContext: IAppContextViewModel) {}

    get translations$() {
        return this._appContext.translations$;
    }

    get appLang$() {
        return this._appContext.appLang$;
    }

    get appTheme$() {
        return this._appContext.appTheme$;
    }

    get theme$() {
        return this._appContext.theme$;
    }

    get isLoading$() {
        return this._appContext.isLoading$;
    }

    public setDefaultValues = () => {
        this._appContext.setDefaultValues();
    };
}
