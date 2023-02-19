import * as modelsTools from '../../context/models';
import * as contextTools from '../../context/AppContext';
import { AppTheme, TAppContext, IAppGeneralSettings } from '../../types';
import { getAppContextMock } from '../mocks';
import { renderHook } from '@testing-library/react';
import { useThemeButtonElementViewModel } from '../../viewModels';
import { Observable } from 'rxjs';
import { AppThemeModel } from '../../models/AppThemeModel';
import { DEFAULTS } from '../../defaults';
import { appGeneralSettingsModelMock } from '../mocks';

describe('useThemeButtonElementViewModel', () => {
    let modelMock: AppThemeModel;
    let contextMock: TAppContext;

    beforeEach(() => {
        const generalSettingsModelMock = appGeneralSettingsModelMock() as any as IAppGeneralSettings;
        contextMock = getAppContextMock() as any as TAppContext;
        modelMock = generalSettingsModelMock.appThemeModel as any as AppThemeModel;

        jest.spyOn(modelsTools, 'getModelByKey').mockReturnValue(generalSettingsModelMock);
        jest.spyOn(contextTools, 'useAppContext').mockReturnValue(contextMock);
    });

    test('Should return expected data', () => {
        const appTheme = AppTheme.LIGHT;
        modelMock.appTheme = new Observable((observer) => observer.next(appTheme));
        modelMock.theme = new Observable((observer) => observer.next(contextMock.theme));

        const { result } = renderHook(useThemeButtonElementViewModel);
        const expectedValue = {
            translations: contextMock.translations,
            onChangeTheme: expect.any(Function),
            appTheme: appTheme,
        };

        expect(result.current).toEqual(expectedValue);
    });

    test('Should call change theme on model', () => {
        modelMock.appTheme = new Observable((observer) => observer.next(DEFAULTS.APP_THEME));
        const { result } = renderHook(useThemeButtonElementViewModel);
        result.current.onChangeTheme();

        expect(modelMock.toggleAppTheme).toBeCalled();
    });

    test('Should provide appTheme', () => {
        const appTheme = AppTheme.DARK;
        modelMock.appTheme = new Observable((observer) => observer.next(appTheme));
        const { result } = renderHook(useThemeButtonElementViewModel);

        expect(result.current.appTheme).toEqual(appTheme);
    });
});

export {};
