import { bufferCount, map, mergeMap } from 'rxjs';
import { AppLangs, IAppGeneralSettings, IChangeLangElementViewModel, Models, TTranslationsLang } from '../../types';
import { getModelByKey } from '../../context';
import { DEFAULTS } from '../../defaults';

export class ChangeLangElementViewModel implements IChangeLangElementViewModel {
    private _appGeneralSettings = getModelByKey<IAppGeneralSettings>(Models.APP_GENERAL_SETTINGS);

    get items$() {
        return this._appGeneralSettings.appLangModel.translations.pipe(
            mergeMap((translations) => translations.LANGS),
            map(this._mapToItem),
            bufferCount(DEFAULTS.LANGS_AMOUNT),
        );
    }

    get appLang$() {
        return this._appGeneralSettings.appLangModel.appLang;
    }

    public changeAppLang = (value: AppLangs) => {
        this._appGeneralSettings.appLangModel.changeAppLang(value);
    };

    private _mapToItem = (lang: TTranslationsLang) => ({
        key: lang.value,
        label: lang.label,
    });
}
