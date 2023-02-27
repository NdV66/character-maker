import { CHARACTER_TRAITS_PAIRS } from '../defaults';
import { GenericSingletonManager } from '../tools';
import { Models } from '../types';
import { CharacterTraitsManagerModel } from '../models/CharacterTraitsManagerModel';
import { CharacterTraitsPairModel } from '../models/CharacterTraitsPairModel';
import { CharacterTraitModel } from '../models/CharacterTraitModel';
import {
    AppContextViewModel,
    CharacterTraitsElementViewModel,
    ChangeLangElementViewModel,
    ThemeButtonElementViewModel,
    PageViewModel,
    FooterViewModel,
    MainContentViewModel,
} from '../models/viewModels';
import { AppGeneralSettingsModel } from '../models/AppGeneralSettingsModel';
import { AppLangModel } from '../models/AppLangModel';
import { AppThemeModel } from '../models/AppThemeModel';
import { AppLangModelPure } from '../models/AppLangPureModel';
import { AppThemePureModel } from '../models/AppThemePureModel';

const pairs = CHARACTER_TRAITS_PAIRS.map((el) => {
    const mainTrait = new CharacterTraitModel(el.name, el.name);
    const oppositeTrait = new CharacterTraitModel(el.opposite, el.opposite);
    return new CharacterTraitsPairModel(el.id, mainTrait, oppositeTrait);
});

const appLangModelPure = new AppLangModelPure();
const appThemeModelPure = new AppThemePureModel();
const lang = new AppLangModel(appLangModelPure);
const theme = new AppThemeModel(appThemeModelPure);

const appGeneralSettingsSingleton = new AppGeneralSettingsModel(lang, theme);
const characterTraitManagerSingleton = new CharacterTraitsManagerModel(pairs);
const appContextViewModelSingleton = new AppContextViewModel(appGeneralSettingsSingleton);

const MODELS = {
    [Models.THEME_BUTTON_ELEMENT_VIEW_MODEL]: new ThemeButtonElementViewModel(appContextViewModelSingleton),
    [Models.CHANGE_LANG_ELEMENT_VIEW_MODEL]: new ChangeLangElementViewModel(appContextViewModelSingleton),
    [Models.CHARACTER_TRAITS_ELEMENT_VIEW_MODEL]: new CharacterTraitsElementViewModel(
        appContextViewModelSingleton,
        characterTraitManagerSingleton,
    ),
    [Models.PAGE_VIEW_MODEL]: new PageViewModel(appContextViewModelSingleton),
    [Models.FOOTER_VIEW_MODEL]: new FooterViewModel(appContextViewModelSingleton),
    [Models.MAIN_CONTENT_VIEW_MODEL]: new MainContentViewModel(appContextViewModelSingleton),
};

export const ModelsManager = new GenericSingletonManager(MODELS);
