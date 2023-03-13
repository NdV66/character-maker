import { TestScheduler } from 'rxjs/testing';
import { AppThemeModel } from '../../../models';
import { AppTheme, IAppThemePure } from '../../../types';
import { appThemePureModelMock } from '../../mocks/appThemeModelMock';

//TODO: add more tests
describe('AppThemeModel', () => {
    let appThemePureModel: IAppThemePure;
    let model: AppThemeModel;
    let testScheduler: TestScheduler;

    beforeEach(() => {
        appThemePureModel = appThemePureModelMock();
        model = new AppThemeModel(appThemePureModel);
        testScheduler = new TestScheduler((actual, expected) => {
            console.log('>>>>', actual, expected);
            expect(actual).toEqual(expected);
        });
    });

    test('Should set default values', () => {
        model.setDefaultValue();
        expect(appThemePureModel.setDefaultValue).toHaveBeenCalledTimes(1);
    });

    test('Should update appTheme$ (and gets value from pure model)', () => {
        const appTheme = AppTheme.LIGHT;
        appThemePureModel.appTheme = appTheme;

        testScheduler.run(({ expectObservable, cold }) => {
            cold('-a').subscribe(() => model['_updateAppThemeSubject']());
            expectObservable(model.appTheme$).toBe('-a', { a: appTheme });
        });
    });
});

export {};
