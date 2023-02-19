import { ModelsManager } from '../models';

import { Models } from '../types';
import { IAppGeneralSettings, ICharacterTraitsManager } from '../types';

const allModels = {
    [Models.APP_GENERAL_SETTINGS]: ModelsManager.getSingleton<IAppGeneralSettings>(Models.APP_GENERAL_SETTINGS),
    [Models.CHARACTER_TRAITS_MANAGER]: ModelsManager.getSingleton<ICharacterTraitsManager>(
        Models.CHARACTER_TRAITS_MANAGER,
    ),
};

export const getModelByKey = <T>(key: Models) => allModels[key] as any as T;
