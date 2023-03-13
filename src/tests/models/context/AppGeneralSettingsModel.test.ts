import { DEFAULTS } from '../../../defaults';
import { AppGeneralSettingsModel } from '../../../models/context/AppGeneralSettingsModel';
import { IAppLang, IAppTheme } from '../../../types';
import { appLangModelMock } from '../../mocks/appLangModelMock';
import { appThemeModelMock } from '../../mocks/appThemeModelMock';

describe('AppGeneralSettingsModel', () => {
    const appLangModel = appLangModelMock() as IAppLang;
    const appThemeModel = appThemeModelMock() as IAppTheme;
    let model: AppGeneralSettingsModel;

    beforeEach(() => {
        model = new AppGeneralSettingsModel(appLangModel, appThemeModel);
    });

    test('Should set defaults', () => {
        model.setDefaultValues();

        expect(appThemeModel.setDefaultValue).toHaveBeenCalledTimes(1);
        expect(appLangModel.setDefaultValue).toHaveBeenCalledTimes(1);
        expect(model.isFreeHandMode).toBe(DEFAULTS.FREE_HAND_MODE);
    });

    test('Should have public appLangModel', () => {
        expect(model.appLangModel).toEqual(appLangModel);
    });

    test('Should have public appThemeModel', () => {
        expect(model.appThemeModel).toEqual(appThemeModel);
    });

    test('Should have public isFreeHandMode', () => {
        expect(model.isFreeHandMode).toEqual(DEFAULTS.FREE_HAND_MODE);
    });

    test('Should change isFreeHandMode from default to a given value', () => {
        const value = true;
        model.isFreeHandMode = value;

        expect(model.isFreeHandMode).toEqual(value);
    });
});

export {};
