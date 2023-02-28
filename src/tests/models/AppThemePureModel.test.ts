import { AppThemePureModel } from '../../models';
import { AppTheme } from '../../types';

//TODO: more tests
describe('AppThemePureModel', () => {
    let model: AppThemePureModel;

    beforeEach(() => {
        model = new AppThemePureModel();
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
