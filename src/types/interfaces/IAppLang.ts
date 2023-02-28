import { Observable } from 'rxjs';
import { AppLangs, TTranslations } from '../langs';

export interface IAppLang {
    appLang$: Observable<AppLangs>;
    translations$: Observable<TTranslations>;

    setDefaultValue: () => void;
    changeAppLang: (newLang: AppLangs) => void;
}

export interface IAppLangPure {
    appLang: AppLangs;

    setDefaultValue: () => void;
    changeAppLang: (newLang: AppLangs) => void;
}
