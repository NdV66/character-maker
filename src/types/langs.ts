export const enum AppLangs {
    EN = 'en-EN',
    PL = 'pl-PL',
}

export type TTranslationsLang = {
    label: string;
    value: AppLangs;
};

export type TTranslations = {
    APP_NAME: string;
    AUTHOR: string;
    INFO: string;
    REPO: string;
    CURRENT_LANG: string;
    LANGS: TTranslationsLang[];
    LIGHT: string;
    DARK: string;
    OK: string;
    CANCEL: string;
    CLEAN: string;

    INFO_TEXT: string;

    CHARACTER_TRAITS: {
        HELPFUL: string;
        EGOISTIC: string;
        NICE: string;
        NASTY: string;

        [key: string]: string;
    };

    [key: string]: string | any;
};
