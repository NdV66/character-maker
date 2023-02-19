import { renderHook } from '@testing-library/react';
import * as modelsTools from '../../context/models';
import * as contextTools from '../../context/AppContext';
import { DEFAULTS } from '../../defaults';
import { useChangeLangElementViewModel } from '../../viewModels';
import { appLangModelMock } from '../mocks/appLangModelMock';
import { TEXTS_EN } from '../../langs/en';
import { TEXTS_PL } from '../../langs/pl';
import { AppLangModel } from '../../models/AppLangModel';
import { AppLangs, TAppContext } from '../../types';
import { Observable } from 'rxjs';
import { getAppContextMock } from '../mocks/appContext';

describe('useChangeLangElementViewModel', () => {
    let modelMock: AppLangModel;
    let contextMock: TAppContext;

    beforeEach(() => {
        contextMock = getAppContextMock() as any as TAppContext;
        modelMock = appLangModelMock() as any as AppLangModel;

        jest.spyOn(modelsTools, 'getModelByKey').mockReturnValue(modelMock);
        jest.spyOn(contextTools, 'useAppContext').mockReturnValue(contextMock);
    });

    test('Should return all needed fields', () => {
        const { result } = renderHook(useChangeLangElementViewModel);

        const expectedValue = {
            onClickItem: expect.any(Function),
            appLang: DEFAULTS.LANG,
            items: expect.any(Array),
        };

        expect(result.current).toEqual(expectedValue);
    });

    test('Should change app lang', () => {
        const lang = AppLangs.PL;
        const { result } = renderHook(useChangeLangElementViewModel);
        result.current.onClickItem({ key: lang } as any);

        expect(modelMock.changeAppLang).toBeCalledWith(lang);
    });

    test('Should prepare items', () => {
        const expectedValue = [
            { key: 'en-EN', label: 'English' },
            { key: 'pl-PL', label: 'Polski' },
        ];
        modelMock.translations = new Observable((observer) => observer.next(TEXTS_PL));
        const { result } = renderHook(useChangeLangElementViewModel);
        modelMock.translations = new Observable((observer) => observer.next(TEXTS_EN));

        expect(result.current.items).toEqual(expectedValue);
    });
});

export {};
