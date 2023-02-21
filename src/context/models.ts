import { ModelsManager } from '../models';

import { Models } from '../types';

export const getModelByKey = <T>(key: Models) => ModelsManager.getSingleton<T>(key) as any as T;
