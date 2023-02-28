import { COOKIE_THEME_KEY, DEFAULTS } from '../../../defaults';
import { AppThemePureModel } from '../../../models';
import { DARK_THEME } from '../../../styles';
import { AppTheme } from '../../../types';
import { cookiesManagerMock } from '../../mocks';

describe('AppThemePureModel', () => {
    let model: AppThemePureModel;

    beforeEach(() => {
        model = new AppThemePureModel(cookiesManagerMock);
    });

    test('Should have default appTheme on enter', () => {
        expect(model.appTheme).toBe(DEFAULTS.APP_THEME);
    });

    test('Should set appTheme (and save in the cookie)', () => {
        const appTheme = AppTheme.DARK;
        model.changeAppTheme(appTheme);

        expect(model.appTheme).toBe(appTheme);
        expect(cookiesManagerMock.setCookie).toHaveBeenCalledTimes(1);
        expect(cookiesManagerMock.setCookie).toHaveBeenCalledWith(COOKIE_THEME_KEY, appTheme);
    });

    test('Should get theme by appTheme key', () => {
        const appTheme = AppTheme.DARK;
        const result = model.getTheme(appTheme);
        expect(result).toBe(DARK_THEME);
    });

    test('Should set default value (nothing from a theme cookie)', () => {
        model.setDefaultValue();

        expect(model.appTheme).toBe(DEFAULTS.APP_THEME);
        expect(cookiesManagerMock.setCookie).toHaveBeenCalledWith(COOKIE_THEME_KEY, DEFAULTS.APP_THEME);
    });

    test('Should set default value (with value from a theme cookie)', () => {
        const savedData = AppTheme.DARK;
        cookiesManagerMock.getFromCookies = jest.fn().mockReturnValue(savedData);

        model.setDefaultValue();

        expect(model.appTheme).toBe(savedData);
        expect(cookiesManagerMock.setCookie).toHaveBeenCalledWith(COOKIE_THEME_KEY, savedData);
    });

    describe('getNewAppTheme', () => {
        test('Should get a new app theme based on the current one (should be an opposite)', () => {
            const appTheme = AppTheme.DARK;
            const expectedResult = AppTheme.LIGHT;

            const result = model.getNewAppTheme(appTheme);
            expect(result).toEqual(expectedResult);
        });

        test('Should get a new app theme based on the current one (should be an opposite)', () => {
            const appTheme = AppTheme.LIGHT;
            const expectedResult = AppTheme.DARK;

            const result = model.getNewAppTheme(appTheme);
            expect(result).toEqual(expectedResult);
        });
    });
});

export {};
