import { TEXTS_EN } from '../../langs/en';
import { DARK_THEME } from '../../styles';
import { AppTheme } from '../../types';

export const PAGE_VIEW_MODEL_DATA = {
    theme: DARK_THEME,
    translations: TEXTS_EN,
    antdTheme: {} as any,
    isLoading: false,
    appTheme: AppTheme.DARK,
};

export const FOOTER_VIEW_MODEL_DATA = {
    theme: DARK_THEME,
    translations: TEXTS_EN,
    version: '1.0.0',
};

export const THEME_VIEW_MODEL_DATA = {
    appTheme: AppTheme.DARK,
    translations: TEXTS_EN,
    onChangeTheme: jest.fn(),
};

export const MAIN_VIEW_MODEL_DATA = {
    theme: DARK_THEME,
};
