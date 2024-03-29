import { AppLangs, IAppLangPure, ICookiesManager } from '../../types';
import { COOKIE_LANG_KEY, DEFAULTS } from '../../defaults';

export class AppLangModelPure implements IAppLangPure {
    private _appLang = DEFAULTS.LANG;

    constructor(private _cookiesManager: ICookiesManager) {
        this.setDefaultValue();
    }

    get appLang() {
        return this._appLang;
    }

    public setDefaultValue = () => {
        const savedLang = this._cookiesManager.getFromCookies<AppLangs>(COOKIE_LANG_KEY);
        const lang = savedLang || DEFAULTS.LANG;
        this.changeAppLang(lang);
    };

    public changeAppLang = (newLang: AppLangs) => {
        this._appLang = newLang;
        this._cookiesManager.setCookie(COOKIE_LANG_KEY, newLang);
    };
}
