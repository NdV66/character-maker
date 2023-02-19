import { GenericSingletonManager } from '../tools';
import { Models } from '../types';
import { AppLangModel } from './AppLangModel';
import { AppThemeModel } from './AppThemeModel';

const MODELS = {
    [Models.APP_THEME]: new AppThemeModel(),
    [Models.APP_LANG]: new AppLangModel(),
};

export const ModelsManager = new GenericSingletonManager(MODELS);
