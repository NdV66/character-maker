import { TTranslations } from '../types';
import { LANGS } from './langs';

export const TEXTS_EN: TTranslations = {
    ...LANGS,
    APP_NAME: 'Character Maker',
    AUTHOR: 'Marta Zażlak',
    INFO: 'Make changes to set up your hero character traits. Then you can export it as pdf or jpeg.',
    REPO: 'See repo here',
    CURRENT_LANG: 'English',
    LIGHT: 'light',
    DARK: 'dark',
    OK: 'OK',
    CANCEL: 'Cancel',
    CLEAN: 'Clean everything',
    EXPORT: 'Export',

    INFO_TEXT: 'Setup all character traits and then save your work as JPEG or PDF.',

    CHARACTER_TRAITS: {
        HELPFUL: 'helpful',
        EGOISTIC: 'egoistic',
        NICE: 'nice',
        NASTY: 'nasty',
        DREAMER: 'dreamer',
        REALIST: 'realist',
    },
};
