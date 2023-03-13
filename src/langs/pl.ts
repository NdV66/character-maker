import { TTranslations } from '../types';
import { LANGS } from './langs';

export const TEXTS_PL: TTranslations = {
    ...LANGS,
    APP_NAME: 'Character Maker',
    AUTHOR: 'Marta Zażlak',
    INFO: 'Przesuwaj suwaki, aby wybrać charakter swojej postaci. Nastepnie możesz zachować swoje dzieło, eksportując je do JPEG.',
    REPO: 'Zerknij na repozytorium',
    CURRENT_LANG: 'Polski',
    LIGHT: 'jasny',
    DARK: 'ciemny',
    OK: 'OK',
    CANCEL: 'Zamknij',
    CLEAN: 'Wyczyść',
    EXPORT: 'Pobierz',

    INFO_TEXT:
        'Ustaw cechy charakteru, korzystając z suwaczków poniżej. Kiedy będziesz zadwolony z rezultatów, możesz wyeksportować swoje dzieło do formatu JPEG.',
    FREE_HAND_MODE: 'free hand',
    STRICT_MODE: 'strict',
    CHANGE_MODE_TIP: 'Jedna z wartości może przekroczyć wartość 100. Może chcesz włączyć tryb free hand?',

    CHARACTER_TRAITS: {
        HELPFUL: 'uczynny',
        EGOISTIC: 'egoistyczny',
        NICE: 'miły',
        NASTY: 'niemiły',
        DREAMER: 'marzyciel',
        REALIST: 'relalista',
        LOGICAL: 'logiczny',
        EMOTIONAL: 'emocjonalny',
        CALM: 'spokojny',
        IMPULSIVE: 'impulsywny',
        FEARFUL: 'strachliwy',
        COURAGEOUS: 'odważny',
        LOVING: 'kochający',
        HATEFUL: 'nienawistny',
        HAPPY: 'szczęśliwy',
        MELANCHOLIC: 'melancholijny',
    },
};
