import { IAppGeneralSettings, IAppLang, IAppTheme } from '../types';
import { AppLangModel } from './AppLangModel';
import { AppThemeModel } from './AppThemeModel';

export class AppGeneralSettingsModel implements IAppGeneralSettings {
    public readonly appLangModel: IAppLang = new AppLangModel();
    public readonly appThemeModel: IAppTheme = new AppThemeModel();

    public setDefaultValues() {
        this.appLangModel.setDefaultValue();
        this.appThemeModel.setDefaultValue();
    }
}
