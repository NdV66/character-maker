import { IAppLang } from './IAppLang';
import { IAppTheme } from './IAppTheme';

export interface IAppGeneralSettings {
    appThemeModel: IAppTheme;
    appLangModel: IAppLang;

    setDefaultValues: () => void;
}
