import { DEFAULTS } from '../../defaults';
import { IAppGeneralSettings, IAppLang, IAppTheme } from '../../types';

export class AppGeneralSettingsModel implements IAppGeneralSettings {
    public isFreeHandMode = DEFAULTS.FREE_HAND_MODE;

    constructor(public readonly appLangModel: IAppLang, public readonly appThemeModel: IAppTheme) {}

    public setDefaultValues() {
        this.isFreeHandMode = DEFAULTS.FREE_HAND_MODE;

        this.appLangModel.setDefaultValue();
        this.appThemeModel.setDefaultValue();
    }
}
