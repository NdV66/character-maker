import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { AppContextViewModel } from '../../../models';
import { AppLangs, AppTheme, IAppGeneralSettings } from '../../../types';
import { appGeneralSettingsModelMock } from '../../mocks';
import { DARK_THEME } from '../../../styles';
import { TEXTS_EN } from '../../../langs/en';

const EMIT_PATTERN = '-a';

describe('AppContextViewModel', () => {
    let model: AppContextViewModel;
    let generalSettingsModelMock: IAppGeneralSettings;
    let testScheduler: TestScheduler;

    beforeEach(() => {
        generalSettingsModelMock = appGeneralSettingsModelMock();
        model = new AppContextViewModel(generalSettingsModelMock);

        testScheduler = new TestScheduler((actual, expected) => {
            console.log(actual, expected);
            expect(actual).toEqual(expected);
        });
    });

    test.only('Should return current isFreeHandMode$', () => {
        const value = true;
        model.setIsFreeHandMode(value);

        testScheduler.run(({ expectObservable }) => {
            expectObservable(model.isFreeHandMode$).toBe('a', { a: value });
        });
    });

    test('Should return current theme$', () => {
        const theme = DARK_THEME;
        generalSettingsModelMock.appThemeModel.theme$ = new Observable((observer) => observer.next(theme));

        testScheduler.run(({ expectObservable }) => {
            expectObservable(model.theme$).toBe('a', { a: theme });
        });
    });

    test('Should return current translations$', () => {
        const translations = TEXTS_EN;
        generalSettingsModelMock.appLangModel.translations$ = new Observable((observer) => observer.next(translations));

        testScheduler.run(({ expectObservable }) => {
            expectObservable(model.translations$).toBe('a', { a: translations });
        });
    });

    test('Should return current appLang$', () => {
        const lang = AppLangs.PL;
        generalSettingsModelMock.appLangModel.appLang$ = new Observable((observer) => observer.next(lang));

        testScheduler.run(({ expectObservable }) => {
            expectObservable(model.appLang$).toBe('a', { a: lang });
        });
    });

    test('Should return current appTheme$', () => {
        const theme = AppTheme.DARK;
        generalSettingsModelMock.appThemeModel.appTheme$ = new Observable((observer) => observer.next(theme));

        testScheduler.run(({ expectObservable }) => {
            expectObservable(model.appTheme$).toBe('a', { a: theme });
        });
    });

    describe('isLoading', () => {
        test('- is false (theme and translations are available)', () => {
            generalSettingsModelMock.appLangModel.translations$ = new Observable((observer) => observer.next(TEXTS_EN));
            generalSettingsModelMock.appThemeModel.theme$ = new Observable((observer) => observer.next(DARK_THEME));

            testScheduler.run(({ expectObservable }) => {
                model = new AppContextViewModel(generalSettingsModelMock);
                expectObservable(model.isLoading$).toBe('a', { a: false });
            });
        });

        test('- is true (theme and translations are both not available)', () => {
            generalSettingsModelMock.appLangModel.translations$ = new Observable((observer) =>
                observer.next(undefined),
            );
            generalSettingsModelMock.appThemeModel.theme$ = new Observable((observer) => observer.next(undefined));

            testScheduler.run(({ expectObservable }) => {
                model = new AppContextViewModel(generalSettingsModelMock);
                expectObservable(model.isLoading$).toBe('a', { a: true });
            });
        });

        test('- is true (theme is available but translations are not)', () => {
            let model: AppContextViewModel;
            generalSettingsModelMock.appLangModel.translations$ = new Observable((observer) =>
                observer.next(undefined),
            );
            generalSettingsModelMock.appThemeModel.theme$ = new Observable((observer) => observer.next(DARK_THEME));

            testScheduler.run(({ expectObservable }) => {
                model = new AppContextViewModel(generalSettingsModelMock);
                expectObservable(model.isLoading$).toBe('a', { a: true });
            });
        });

        test('- is true (translations are available but theme is not)', () => {
            generalSettingsModelMock.appLangModel.translations$ = new Observable((observer) => observer.next(TEXTS_EN));
            generalSettingsModelMock.appThemeModel.theme$ = new Observable((observer) => observer.next(undefined));

            testScheduler.run(({ expectObservable }) => {
                model = new AppContextViewModel(generalSettingsModelMock);
                expectObservable(model.isLoading$).toBe('a', { a: true });
            });
        });
    });

    test('setDefaultValues', () => {
        const result = model.setDefaultValues();

        expect(generalSettingsModelMock.setDefaultValues).toHaveBeenCalledTimes(1);
        expect(result).toBe(true);
    });

    // test('setIsFreeHandMode', () => {

    // })

    test('changeAppLang', () => {
        const lang = AppLangs.PL;
        model.changeAppLang(lang);

        expect(generalSettingsModelMock.appLangModel.changeAppLang).toHaveBeenCalledTimes(1);
        expect(generalSettingsModelMock.appLangModel.changeAppLang).toHaveBeenCalledWith(lang);
    });

    test('toggleAppTheme', () => {
        model.toggleAppTheme();
        expect(generalSettingsModelMock.appThemeModel.toggleAppTheme).toHaveBeenCalledTimes(1);
    });

    test('Should set is loading manually (from default to false)', () => {
        testScheduler.run(({ cold, expectObservable }) => {
            cold(EMIT_PATTERN).subscribe(() => model.setIsLoading(false));
            expectObservable(model.isLoading$).toBe('ab', { a: true, b: false });
        });
    });

    test('Should set is loading manually (from default to false)', () => {
        testScheduler.run(({ cold, expectObservable }) => {
            cold(EMIT_PATTERN).subscribe(() => model.setIsLoading(true));
            expectObservable(model.isLoading$).toBe('ab', { a: true, b: true });
        });
    });
});

export {};
