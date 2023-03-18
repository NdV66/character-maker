import { TestScheduler } from 'rxjs/testing';
import { AppThemeModel } from '../../../models';
import { DARK_THEME, LIGHT_THEME } from '../../../styles';
import { AppTheme, IAppThemePure } from '../../../types';
import { appThemePureModelMock } from '../../mocks/appThemeModelMock';

describe('AppThemeModel', () => {
    let appThemePureModel: IAppThemePure;
    let model: AppThemeModel;
    let testScheduler: TestScheduler;
    let appThemeOnEnter: AppTheme;

    beforeEach(() => {
        appThemePureModel = appThemePureModelMock();
        appThemeOnEnter = appThemePureModel.appTheme;
        model = new AppThemeModel(appThemePureModel);

        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });
    });

    test('Should set default values', () => {
        model.setDefaultValue();
        expect(appThemePureModel.setDefaultValue).toHaveBeenCalledTimes(1);
    });

    test('Should create _appTheme$ correctly', () => {
        testScheduler.run(({ expectObservable }) => {
            expectObservable(model['_appTheme$']).toBe('a', { a: appThemeOnEnter });
        });
    });

    test('Should get appTheme$ correctly', () => {
        const appTheme = AppTheme.LIGHT;

        testScheduler.run(({ expectObservable, cold }) => {
            cold('-a').subscribe(() => model['_appTheme$'].next(appTheme));

            expectObservable(model['_appTheme$']).toBe('ab', { a: appThemeOnEnter, b: appTheme });
            expectObservable(model.appTheme$).toBe('ab', { a: appThemeOnEnter, b: appTheme });
        });
    });

    test('Should get theme$ correctly', () => {
        const theme = LIGHT_THEME;
        const enterTheme = DARK_THEME;
        const appTheme = AppTheme.LIGHT;
        appThemePureModel.getTheme = jest.fn().mockReturnValueOnce(enterTheme).mockReturnValueOnce(theme);

        testScheduler.run(({ expectObservable, cold }) => {
            cold('-a').subscribe(() => {
                model['_appTheme$'].next(appTheme);
                expect(appThemePureModel.getTheme).toHaveBeenCalledTimes(2);
            });

            expectObservable(model.theme$).toBe('ab', { a: enterTheme, b: theme });
        });
    });

    test('Should _mapToTheme() work correctly', () => {
        const theme = LIGHT_THEME;
        appThemePureModel.getTheme = jest.fn().mockReturnValue(theme);

        const result = model['_mapToTheme'](AppTheme.LIGHT);
        expect(result).toBe(theme);
    });

    test('Should update appTheme$ (and gets value from pure model)', () => {
        const appTheme = AppTheme.LIGHT;
        appThemePureModel.appTheme = appTheme;

        testScheduler.run(({ expectObservable, cold }) => {
            cold('-a').subscribe(() => model['_updateAppThemeSubject']());
            expectObservable(model.appTheme$).toBe('ab', { a: appThemeOnEnter, b: appTheme });
        });
    });

    test('Should save in a cookie on change appTheme$', () => {
        const appTheme = AppTheme.LIGHT;

        testScheduler.run(({ expectObservable, cold }) => {
            cold('-a').subscribe(() => {
                model['_appTheme$'].next(appTheme);

                expect(appThemePureModel.changeAppTheme).toHaveBeenCalledTimes(2);
                expect(appThemePureModel.changeAppTheme).toHaveBeenCalledWith(appTheme);
            });

            expectObservable(model.appTheme$).toBe('ab', { a: appThemeOnEnter, b: appTheme });
            expectObservable(model['_appTheme$']).toBe('ab', { a: appThemeOnEnter, b: appTheme });
        });
    });

    test('Should set default values', () => {
        model['_updateAppThemeSubject'] = jest.fn();

        testScheduler.run(({ cold }) => {
            cold('-a').subscribe(() => {
                model.setDefaultValue();

                expect(appThemePureModel.setDefaultValue).toHaveBeenCalledTimes(1);
                expect(model['_updateAppThemeSubject']).toHaveBeenCalledTimes(1);
            });
        });
    });

    test('Should toggle appTheme$', () => {
        const appTheme = AppTheme.LIGHT;
        const newAppTheme = AppTheme.DARK;
        appThemePureModel.getNewAppTheme = jest.fn().mockReturnValue(newAppTheme);
        model['_updateAppThemeSubject'] = jest.fn();
        model['_appTheme$'].next(appTheme);

        testScheduler.run(({ cold }) => {
            cold('-a').subscribe(async () => {
                await model.toggleAppTheme();

                expect(appThemePureModel.changeAppTheme).toHaveBeenCalledTimes(3);
                expect(appThemePureModel.changeAppTheme).toHaveBeenCalledWith(newAppTheme);
                expect(model['_updateAppThemeSubject']).toHaveBeenCalledTimes(1);
                expect(appThemePureModel.getNewAppTheme).toHaveBeenCalledTimes(1);
            });
        });
    });
});

export {};
