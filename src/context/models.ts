import { ModelsManager } from '../models';
import { AppLangModel } from '../models/AppLangModel';
import { AppThemeModel } from '../models/AppThemeModel';

import { Models } from '../types';

const allModels = {
    [Models.APP_THEME]: ModelsManager.getSingleton<AppThemeModel>(Models.APP_THEME),
    [Models.APP_LANG]: ModelsManager.getSingleton<AppLangModel>(Models.APP_LANG),
};

export const getModelByKey = <T>(key: Models) => allModels[key] as T;
