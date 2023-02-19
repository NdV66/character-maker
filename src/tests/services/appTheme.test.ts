import { getNewAppTheme } from '../../services/appTheme.service';
import { AppTheme } from '../../types';

describe('getNewAppTheme', () => {
    test('Should get a new app theme based on the current one (should be an opposite)', () => {
        const appTheme = AppTheme.DARK;
        const expectedResult = AppTheme.LIGHT;

        const result = getNewAppTheme(appTheme);
        expect(result).toEqual(expectedResult);
    });

    test('Should get a new app theme based on the current one (should be an opposite)', () => {
        const appTheme = AppTheme.LIGHT;
        const expectedResult = AppTheme.DARK;

        const result = getNewAppTheme(appTheme);
        expect(result).toEqual(expectedResult);
    });
});

export {};
