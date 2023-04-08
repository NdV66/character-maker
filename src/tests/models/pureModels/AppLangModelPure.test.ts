import { COOKIE_LANG_KEY, DEFAULTS } from '../../../defaults';
import { AppLangModelPure } from '../../../models/pureModels/AppLangPureModel';
import { AppLangs } from '../../../types';
import { cookiesManagerMock } from '../../mocks';

describe('AppLangModelPure', () => {
    let model: AppLangModelPure;

    beforeEach(() => {
        model = new AppLangModelPure(cookiesManagerMock);
    });

    test('Should have set default values on enter (with cookie)', () => {
        const lang = AppLangs.PL;
        cookiesManagerMock.getFromCookies = jest.fn().mockReturnValue(lang);
        model = new AppLangModelPure(cookiesManagerMock);

        expect(model.appLang).toBe(lang);
        expect(cookiesManagerMock.getFromCookies).toHaveBeenCalledTimes(1);
        expect(cookiesManagerMock.getFromCookies).toHaveBeenCalledWith(COOKIE_LANG_KEY);
    });

    test('Should have default appLang on enter (no cookie)', () => {
        cookiesManagerMock.getFromCookies = jest.fn().mockReturnValue(undefined);
        model = new AppLangModelPure(cookiesManagerMock);

        expect(model.appLang).toBe(DEFAULTS.LANG);
    });

    test('Should change appLang (and save in the cookie)', () => {
        const lang = AppLangs.PL;
        model.changeAppLang(lang);

        expect(model.appLang).toBe(lang);
        expect(cookiesManagerMock.setCookie).toHaveBeenCalledTimes(2);
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
