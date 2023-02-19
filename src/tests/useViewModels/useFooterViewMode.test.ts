import * as contextTools from '../../context/AppContext';
import { TAppContext } from '../../types';
import { getAppContextMock } from '../mocks/appContext';
import { renderHook } from '@testing-library/react';
import { useFooterViewModel } from '../../useViewModels';

describe('useFooterViewModel', () => {
    let contextMock: TAppContext;

    beforeEach(() => {
        contextMock = getAppContextMock() as any as TAppContext;
        jest.spyOn(contextTools, 'useAppContext').mockReturnValue(contextMock);
    });

    test('Should return expected data', () => {
        const { result } = renderHook(useFooterViewModel);
        const expectedValue = {
            theme: contextMock.theme,
            translations: contextMock.translations,
            version: expect.any(String),
        };

        expect(result.current).toEqual(expectedValue);
    });
});

export {};
