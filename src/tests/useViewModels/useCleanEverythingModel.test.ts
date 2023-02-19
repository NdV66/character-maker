import * as contextTools from '../../context/AppContext';
import { TAppContext } from '../../types';
import { getAppContextMock } from '../mocks/appContext';
import { renderHook } from '@testing-library/react';
import { useCleanEverythingModel } from '../../viewModels/useCleanEverythingModel';

describe('useCleanEverythingModel', () => {
    let contextMock: TAppContext;

    beforeEach(() => {
        contextMock = getAppContextMock() as any as TAppContext;
        jest.spyOn(contextTools, 'useAppContext').mockReturnValue(contextMock);
    });

    test('Should return expected data', () => {
        const { result } = renderHook(() => useCleanEverythingModel());
        const expectedValue = {
            theme: contextMock.theme,
            onCleanAll: expect.any(Function),
            translations: contextMock.translations,
            disabled: expect.any(Boolean),
        };

        expect(result.current).toEqual(expectedValue);
    });

    //TODO add more tests
});

export {};
