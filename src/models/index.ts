import { GenericSingletonManager } from '../tools';
import { Models } from '../types';
import { AppGeneralSettingsModel } from './AppGeneralSettingsModel';
import { CharacterTraitsManagerModel } from './CharacterTraitsManagerModel';

const MODELS = {
    [Models.APP_GENERAL_SETTINGS]: new AppGeneralSettingsModel(),
    [Models.CHARACTER_TRAITS_MANAGER]: new CharacterTraitsManagerModel([]), //TODO pairs
};

export const ModelsManager = new GenericSingletonManager(MODELS);
