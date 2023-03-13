import { TTranslations } from '../types';
import { LANGS } from './langs';

export const TEXTS_EN: TTranslations = {
    ...LANGS,
    APP_NAME: 'Character Maker',
    AUTHOR: 'Marta Zażlak',
    INFO: 'Make changes to set up your hero character traits. Then you can export it as JPEG.',
    REPO: 'See repo here',
    CURRENT_LANG: 'English',
    LIGHT: 'light',
    DARK: 'dark',
    OK: 'OK',
    CANCEL: 'Cancel',
    CLEAN: 'Clean everything',
    EXPORT: 'Export',

    INFO_TEXT: 'Setup all character traits and then save your work as JPEG.',
    FREE_HAND_MODE: 'free hand',
    STRICT_MODE: 'strict',
    CHANGE_MODE_TIP: 'One of the values could be more than 100. Would you like to turn on free hand mode?',

    CHARACTER_TRAITS: {
        HELPFUL: 'helpful',
        EGOISTIC: 'egoistic',
        NICE: 'nice',
        NASTY: 'nasty',
        DREAMER: 'dreamer',
        REALIST: 'realist',
        LOGICAL: 'logical',
        EMOTIONAL: 'emotional',
        CALM: 'calm',
        IMPULSIVE: 'impulsive',
        FEARFUL: 'fearful',
        COURAGEOUS: 'courageous',
        LOVING: 'loving',
        HATEFUL: 'hateful',
        HAPPY: 'happy',
        MELANCHOLIC: 'melancholic',
    },
};
