import { GenericSingletonManager } from '../tools';
import { Models } from '../types';
import { AppGeneralSettingsModel } from './AppGeneralSettingsModel';

const MODELS = {
    [Models.APP_GENERAL_SETTINGS]: new AppGeneralSettingsModel(),
};

export const ModelsManager = new GenericSingletonManager(MODELS);
