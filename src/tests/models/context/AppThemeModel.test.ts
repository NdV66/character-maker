// import { TestScheduler } from 'rxjs/testing';
import { AppThemeModel } from '../../../models';
// import { AppTheme } from '../../../types';
import { appThemePureModelMock } from '../../mocks/appThemeModelMock';

//TODO: add more tests
describe('AppThemeModel', () => {
    const appThemePureModel = appThemePureModelMock();
    let model: AppThemeModel;
    // let testScheduler: TestScheduler;

    beforeEach(() => {
        model = new AppThemeModel(appThemePureModel);
        // testScheduler = new TestScheduler((actual, expected) => {
        //     console.log('>>>>', actual, expected);
        //     expect(actual).toEqual(expected);
        // });
    });

    test('Should set default values', () => {
        model.setDefaultValue();
        expect(appThemePureModel.setDefaultValue).toHaveBeenCalledTimes(1);
    });

    // test.only('Should update appTheme subject (and gets value from pure model)', () => {
    //     const appTheme = AppTheme.LIGHT;
    //     appThemePureModel.appTheme = appTheme;

    //     testScheduler.run(({ expectObservable, cold }) => {
    //         cold('-a').subscribe(() => model['_updateAppThemeSubject']());
    //         expectObservable(model.theme$).toBe('-ab', { a: appTheme });
    //     });
    // });
});

export {};
