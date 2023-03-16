import { AppLangs, IAppLangPure, TTranslations } from '../../types';
import { map, connect, Subject } from 'rxjs';
import { IAppLang } from '../../types';
import { IGenericSingletonManager } from '../../types/interfaces/IGenericSingletonManager';

export class AppLangModel implements IAppLang {
    private _appLang$ = new Subject<AppLangs>();
    private _translations$ = this._appLang$.pipe(map((value) => this._getLangFromManager(value)));

    constructor(private _appLangModelPure: IAppLangPure, private _langManager: IGenericSingletonManager) {
        this._saveLangCookieOnChange();
    }

    get appLang$() {
        return this._appLang$.pipe(connect(() => this._appLang$));
    }

    get translations$() {
        return this._translations$;
    }

    private _getLangFromManager(lang: AppLangs) {
        return this._langManager.getSingleton<TTranslations>(lang);
    }

    private _updateLangSubject(newLang?: AppLangs) {
        const lang = newLang || this._appLangModelPure.appLang;
        this._appLang$.next(lang);
    }

    private _saveLangCookieOnChange() {
        this._appLang$.subscribe((value) => this._appLangModelPure.changeAppLang(value));
    }

    public setDefaultValue = () => {
        this._appLangModelPure.setDefaultValue();
        this._updateLangSubject();
    };

    public changeAppLang = (newLang: AppLangs) => {
        this._updateLangSubject(newLang);
    };
}
