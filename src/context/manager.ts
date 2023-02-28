import { CHARACTER_TRAITS_PAIRS } from '../defaults';
import { Models } from '../types';
import {
    CharacterTraitModel,
    CharacterTraitsPairModel,
    AppLangModelPure,
    AppThemePureModel,
    AppThemeModel,
    AppGeneralSettingsModel,
    CharacterTraitsManagerModel,
    AppContextViewModel,
    ThemeButtonElementViewModel,
    ChangeLangElementViewModel,
    CharacterTraitsElementViewModel,
    PageViewModel,
    FooterViewModel,
    MainContentViewModel,
    GenericSingletonManager,
    AppLangModel,
    CookiesManager,
} from '../models';
import { langManager } from './langManager';

const pairs = CHARACTER_TRAITS_PAIRS.map((el) => {
    const mainTrait = new CharacterTraitModel(el.name, el.name);
    const oppositeTrait = new CharacterTraitModel(el.opposite, el.opposite);
    return new CharacterTraitsPairModel(el.id, mainTrait, oppositeTrait);
});

const cookiesManager = new CookiesManager();

const appLangModelPure = new AppLangModelPure(cookiesManager);
const appThemeModelPure = new AppThemePureModel(cookiesManager);
const lang = new AppLangModel(appLangModelPure, langManager);
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
