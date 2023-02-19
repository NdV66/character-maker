import { TTranslations } from './langs';
import { TTheme } from './theme';

export type TAppContext = {
    theme: TTheme;
    translations: TTranslations;
    isLoading: boolean;
};
