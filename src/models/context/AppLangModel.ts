import { AppLangs, IAppLangPure, TTranslations } from '../../types';
import { map, connect, Subject } from 'rxjs';
import { LangManager } from '../../langs/LangManager';
import { IAppLang } from '../../types';

const getLangFromManager = (lang: AppLangs) => LangManager.getSingleton<TTranslations>(lang);

export class AppLangModel implements IAppLang {
    private _appLang$ = new Subject<AppLangs>();
    private _translations$ = this._appLang$.pipe(map(getLangFromManager));

    public readonly appLang$ = this._appLang$.pipe(connect(() => this._appLang$));

    get translations$() {
        return this._translations$;
    }

    constructor(private _appLangModelPure: IAppLangPure) {
        this._saveLangCookieOnChange();
    }

    private _updateLangSubject(newLang?: AppLangs) {
        const lang = newLang || this._appLangModelPure.appLang;
        this._appLang$.next(lang);
    }

    private _saveLangCookieOnChange() {
        this.appLang$.subscribe((value) => this._appLangModelPure.changeAppLang(value));
    }

    public setDefaultValue = () => {
        this._appLangModelPure.setDefaultValue();
        this._updateLangSubject();
    };

    public changeAppLang = (newLang: AppLangs) => {
        this._updateLangSubject(newLang);
    };
}
