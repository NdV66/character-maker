import { TTranslations } from '../types';
import { LANGS } from './langs';

export const TEXTS_PL: TTranslations = {
    ...LANGS,
    APP_NAME: 'Chracter Maker',
    AUTHOR: 'Marta Zażlak',
    INFO: 'Przesuwaj suwaki, aby wybrać charakter swojej postaci. Nastepnie możesz zachować swoje dzieło, eksportując je do pdf lub jpeg.',
    REPO: 'Zerknij na repozytorium',
    CURRENT_LANG: 'Polski',
    LIGHT: 'jasny',
    DARK: 'ciemny',
    OK: 'OK',
    CANCEL: 'Zamknij',
    CLEAN: 'Wyczyść wszystko',

    CHARACTER_TRAITS: {
        HELPFUL: 'uczynny',
        EGOISTIC: 'egoistyczny',
        NICE: 'miły',
        NASTY: 'niemiły',
    },
};
