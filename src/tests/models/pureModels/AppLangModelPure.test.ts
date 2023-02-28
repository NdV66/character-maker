import { COOKIE_LANG_KEY, DEFAULTS } from '../../../defaults';
import { AppLangModelPure } from '../../../models';
import { AppLangs } from '../../../types';
import { cookiesManagerMock } from '../../mocks';

describe('AppLangModelPure', () => {
    let model: AppLangModelPure;

    beforeEach(() => {
        model = new AppLangModelPure(cookiesManagerMock);
    });

    test('Should have default appLang on enter', () => {
        expect(model.appLang).toBe(DEFAULTS.LANG);
    });

    test('Should change appLang (and save in the cookie)', () => {
        const lang = AppLangs.PL;
        model.changeAppLang(lang);

        expect(model.appLang).toBe(lang);
        expect(cookiesManagerMock.setCookie).toHaveBeenCalledTimes(1);
        expect(cookiesManagerMock.setCookie).toHaveBeenCalledWith(COOKIE_LANG_KEY, lang);
    });

    test('Should set default value (nothing from a lang cookie)', () => {
        model.setDefaultValue();

        expect(model.appLang).toBe(DEFAULTS.LANG);
        expect(cookiesManagerMock.setCookie).toHaveBeenCalledWith(COOKIE_LANG_KEY, DEFAULTS.LANG);
    });

    test('Should set default value (with value from a lang cookie)', () => {
        const savedLang = AppLangs.PL;
        cookiesManagerMock.getFromCookies = jest.fn().mockReturnValue(savedLang);

        model.setDefaultValue();

        expect(model.appLang).toBe(savedLang);
        expect(cookiesManagerMock.setCookie).toHaveBeenCalledWith(COOKIE_LANG_KEY, savedLang);
    });
});

export {};
