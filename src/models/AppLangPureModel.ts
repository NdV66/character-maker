import { AppLangs, IAppLangPure } from '../types';
import { COOKIE_LANG_KEY, DEFAULTS } from '../defaults';
import { getFromCookies, setCookie } from '../services';

export class AppLangModelPure implements IAppLangPure {
    private _appLang = DEFAULTS.LANG;

    get appLang() {
        return this._appLang;
    }

    public setDefaultValue = () => {
        const savedLang = getFromCookies<AppLangs>(COOKIE_LANG_KEY);
        const lang = savedLang || DEFAULTS.LANG;
        this.changeAppLang(lang);
    };

    public changeAppLang = (newLang: AppLangs) => {
        this._appLang = newLang;
        setCookie(COOKIE_LANG_KEY, newLang);
    };
}
