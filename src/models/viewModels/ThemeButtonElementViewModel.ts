import { IThemeButtonElementViewModel, IAppContextViewModel } from '../../types';

export class ThemeButtonElementViewModel implements IThemeButtonElementViewModel {
    constructor(private _appContext: IAppContextViewModel) {}

    get appTheme$() {
        return this._appContext.appTheme$;
    }

    get translations$() {
        return this._appContext.translations$;
    }

    public toggleAppTheme = () => this._appContext.toggleAppTheme();
}
