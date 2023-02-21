import { AppLangs, TTranslations } from '../types';
import { map, connect, Subject } from 'rxjs';
import { LangManager } from '../langs/LangManager';
import { COOKIE_LANG_KEY, DEFAULTS } from '../defaults';
import { getFromCookies, setCookie } from '../services';
import { IAppLang } from '../types';

export const getLangFromManager = (lang: AppLangs) => LangManager.getSingleton<TTranslations>(lang);

export class AppLangModel implements IAppLang {
    private _appLangSubject = new Subject<AppLangs>();
    public appLang = this._appLangSubject.pipe(connect(() => this._appLangSubject));
    public translations = this._appLangSubject.pipe(map(getLangFromManager));

    constructor() {
        this._saveLangCookieOnChange();
    }

    private _saveLangCookieOnChange() {
        this.appLang.subscribe((value) => setCookie(COOKIE_LANG_KEY, value));
    }

    public setDefaultValue = () => {
        const savedLang = getFromCookies<AppLangs>(COOKIE_LANG_KEY);
        this.changeAppLang(savedLang || DEFAULTS.LANG);
    };

    public changeAppLang = (newLang: AppLangs) => {
        this._appLangSubject.next(newLang);
    };
}
