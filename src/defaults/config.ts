import { TEXTS_EN } from '../langs/en';
import { DARK_THEME } from '../styles/dark.theme';
import { AppLangs, AppTheme } from '../types';

export const DEFAULTS = {
    APP_THEME: AppTheme.DARK,
    THEME: DARK_THEME,
    LANG: AppLangs.EN,
    TRANSLATIONS: TEXTS_EN,
    LANGS_AMOUNT: 2,
    REPO_URL: 'https://github.com/NdV66/character-maker',
    MIN_PERCENT: 0,
    MAX_PERCENT: 100,
    PERCENT: 50,
    MARKS: { 50: '50' },
    FREE_HAND_MODE: false,
    SHOW_TIP: false,
    EXPORTING: false,
};
