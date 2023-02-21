import { IAppGeneralSettings, IAppLang, IAppTheme } from '../types';

export class AppGeneralSettingsModel implements IAppGeneralSettings {
    constructor(public readonly appLangModel: IAppLang, public readonly appThemeModel: IAppTheme) {}

    public setDefaultValues() {
        this.appLangModel.setDefaultValue();
        this.appThemeModel.setDefaultValue();
    }
}
