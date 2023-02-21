import { CHARACTER_TRAITS_PAIRS } from '../defaults';
import { GenericSingletonManager } from '../tools';
import { Models } from '../types';
import { AppGeneralSettingsModel } from './AppGeneralSettingsModel';
import { CharacterTraitsManagerModel } from './CharacterTraitsManagerModel';
import { CharacterTraitsPairModel } from './CharacterTraitsPairModel';
import { CharacterTraitModel } from './CharacterTraitModel';
import { AppContextViewModel } from './viewModels/AppContextViewModel';
import { CharacterTraitsElementViewModel } from './viewModels';
import { ChangeLangElementViewModel } from './viewModels/ChangeLangElementViewModel';

const pairs = CHARACTER_TRAITS_PAIRS.map((el) => {
    const mainTrait = new CharacterTraitModel(el.name, el.name);
    const oppositeTrait = new CharacterTraitModel(el.opposite, el.opposite);
    return new CharacterTraitsPairModel(el.id, mainTrait, oppositeTrait);
});

const MODELS = {
    [Models.APP_CONTEXT_VIEW_MODEL]: new AppContextViewModel(),
    [Models.APP_THEME_VIEW_MODEL]: {}, //Todo
    [Models.CHANGE_LANG_ELEMENT_VIEW_MODEL]: new ChangeLangElementViewModel(),
    [Models.CHARACTER_TRAITS_ELEMENT_VIEW_MODEL]: new CharacterTraitsElementViewModel(),

    [Models.APP_GENERAL_SETTINGS]: new AppGeneralSettingsModel(),
    [Models.CHARACTER_TRAITS_MANAGER]: new CharacterTraitsManagerModel(pairs),
};

export const ModelsManager = new GenericSingletonManager(MODELS);
