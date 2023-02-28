import { COOKIE_LANG_KEY, DEFAULTS } from '../../defaults';
import { AppLangModelPure } from '../../models';
import { AppLangs } from '../../types';
import * as cookiesModule from '../../services/cookies.service';

describe('AppLangModelPure', () => {
    let model: AppLangModelPure;

    beforeEach(() => {
        jest.spyOn(cookiesModule, 'setCookie').mockReturnValue(undefined);
        model = new AppLangModelPure();
    });

    test('Should have default appLang on enter', () => {
        expect(model.appLang).toBe(DEFAULTS.LANG);
    });

    test('Should change appLang (and save in the cookie)', () => {
        const lang = AppLangs.PL;
        model.changeAppLang(lang);

        expect(model.appLang).toBe(lang);
        expect(cookiesModule.setCookie).toHaveBeenCalledTimes(1);
        expect(cookiesModule.setCookie).toHaveBeenCalledWith(COOKIE_LANG_KEY, lang);
    });

    test('Should set default value (nothing from a lang cookie)', () => {
        model.setDefaultValue();

        expect(model.appLang).toBe(DEFAULTS.LANG);
        expect(cookiesModule.setCookie).toHaveBeenCalledWith(COOKIE_LANG_KEY, DEFAULTS.LANG);
    });

    test('Should set default value (with value from a lang cookie)', () => {
        const savedLang = AppLangs.PL;
        jest.spyOn(cookiesModule, 'getFromCookies').mockReturnValue(savedLang);

        model.setDefaultValue();

        expect(model.appLang).toBe(savedLang);
        expect(cookiesModule.setCookie).toHaveBeenCalledWith(COOKIE_LANG_KEY, savedLang);
    });
});

export {};
