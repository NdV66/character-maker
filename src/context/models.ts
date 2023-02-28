import { Models } from '../types';
import { ModelsManager } from './manager';

export const getModelByKey = <T>(key: Models) => ModelsManager.getSingleton<T>(key) as any as T;
