import { bufferCount, map, mergeMap } from 'rxjs';
import { AppLangs, IAppContextViewModel, IChangeLangElementViewModel, TTranslationsLang } from '../../types';
import { DEFAULTS } from '../../defaults';

export class ChangeLangElementViewModel implements IChangeLangElementViewModel {
    constructor(private _appContext: IAppContextViewModel) {}

    get items$() {
        return this._appContext.translations$.pipe(
            mergeMap((translations) => translations.LANGS),
            map(this._mapToItem),
            bufferCount(DEFAULTS.LANGS_AMOUNT),
        );
    }

    get appLang$() {
        return this._appContext.appLang$;
    }

    public changeAppLang = (value: AppLangs) => {
        this._appContext.changeAppLang(value);
    };

    private _mapToItem = (lang: TTranslationsLang) => ({
        key: lang.value,
        label: lang.label,
    });
}
