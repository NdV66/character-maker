import { AppLangs, IAppLangPure, TTranslations } from '../../types';
import { map, BehaviorSubject, Observable } from 'rxjs';
import { IAppLang } from '../../types';
import { IGenericSingletonManager } from '../../types/interfaces/IGenericSingletonManager';

//TODO: tests, but better
export class AppLangModel implements IAppLang {
    private _appLang$: BehaviorSubject<AppLangs>;
    private _translations$: Observable<TTranslations>;

    constructor(private _appLangModelPure: IAppLangPure, private _langManager: IGenericSingletonManager) {
        this._appLang$ = new BehaviorSubject<AppLangs>(this._appLangModelPure.appLang);
        this._translations$ = this._appLang$.pipe(map((value) => this._getLangFromManager(value)));

        this._saveLangCookieOnChange();
    }

    get appLang$() {
        return this._appLang$.asObservable();
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
