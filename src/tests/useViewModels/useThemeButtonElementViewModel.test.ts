import * as modelsTools from '../../context/models';
import * as contextTools from '../../context/AppContext';
import { AppTheme, TAppContext, IAppGeneralSettings } from '../../types';
import { getAppContextMock } from '../mocks';
import { renderHook } from '@testing-library/react';
import { useThemeButtonElementViewModel } from '../../useViewModels';
import { Observable } from 'rxjs';
import { AppThemeModel } from '../../models/AppThemeModel';
import { appGeneralSettingsModelMock } from '../mocks';

//TODO: update tests
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
});

export {};
