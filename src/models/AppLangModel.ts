import { AppLangs, IAppLangPure, TTranslations } from '../types';
import { map, connect, Subject } from 'rxjs';
import { LangManager } from '../langs/LangManager';
import { IAppLang } from '../types';

const getLangFromManager = (lang: AppLangs) => LangManager.getSingleton<TTranslations>(lang);

export class AppLangModel implements IAppLang {
    private _appLangSubject$ = new Subject<AppLangs>();
    public readonly appLang$ = this._appLangSubject$.pipe(connect(() => this._appLangSubject$));
    public readonly translations$ = this._appLangSubject$.pipe(map(getLangFromManager));

    constructor(private _appLangModelPure: IAppLangPure) {
        this._saveLangCookieOnChange();
        this._updateLangSubject();
    }

    private _updateLangSubject() {
        this._appLangSubject$.next(this._appLangModelPure.appLang);
    }

    private _saveLangCookieOnChange() {
        this.appLang$.subscribe((value) => this._appLangModelPure.changeAppLang(value));
    }

    public setDefaultValue = () => {
        this._appLangModelPure.setDefaultValue();
        this._updateLangSubject();
    };

    public changeAppLang = (newLang: AppLangs) => {
        this._appLangSubject$.next(newLang);
        this._updateLangSubject();
    };
}
