import { ModelsManager } from '../models';

import { Models } from '../types';
import { IAppGeneralSettings } from '../types/interfaces';

const allModels = {
    [Models.APP_GENERAL_SETTINGS]: ModelsManager.getSingleton<IAppGeneralSettings>(Models.APP_GENERAL_SETTINGS),
};

export const getModelByKey = <T>(key: Models) => allModels[key] as any as T;
