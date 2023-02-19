import { AppTheme } from '../types';

export const getNewAppTheme = (appTheme: AppTheme) => (appTheme === AppTheme.DARK ? AppTheme.LIGHT : AppTheme.DARK);
