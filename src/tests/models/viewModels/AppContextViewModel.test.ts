import { AppContextViewModel } from '../../../models/viewModels/AppContextViewModel';
import { AppLangs, AppTheme, IAppGeneralSettings } from '../../../types';
import { appGeneralSettingsModelMock } from '../../mocks';
import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { DARK_THEME } from '../../../styles';
import { TEXTS_EN } from '../../../langs/en';

const EMIT_PATTERN = '-a';

describe('AppContextViewModel', () => {
    let generalSettingsModelMock: IAppGeneralSettings;
    let testScheduler: TestScheduler;

    beforeEach(() => {
        generalSettingsModelMock = appGeneralSettingsModelMock() as any as IAppGeneralSettings;
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });
    });

    test('Should return current theme$', () => {
        const theme = DARK_THEME;
        generalSettingsModelMock.appThemeModel.theme = new Observable((observer) => observer.next(theme));

        testScheduler.run(({ expectObservable }) => {
            const model = new AppContextViewModel(generalSettingsModelMock);
            expectObservable(model.theme$).toBe('a', { a: theme });
        });
    });

    test('Should return current translations$', () => {
        const translations = TEXTS_EN;
        generalSettingsModelMock.appLangModel.translations$ = new Observable((observer) => observer.next(translations));

        testScheduler.run(({ expectObservable }) => {
            const model = new AppContextViewModel(generalSettingsModelMock);
            expectObservable(model.translations$).toBe('a', { a: translations });
        });
    });

    test('Should return current appLang$', () => {
        const lang = AppLangs.PL;
        generalSettingsModelMock.appLangModel.appLang$ = new Observable((observer) => observer.next(lang));

        testScheduler.run(({ expectObservable }) => {
            const model = new AppContextViewModel(generalSettingsModelMock);
            expectObservable(model.appLang$).toBe('a', { a: lang });
        });
    });

    test('Should return current appTheme$', () => {
        const theme = AppTheme.DARK;
        generalSettingsModelMock.appThemeModel.appTheme = new Observable((observer) => observer.next(theme));

        testScheduler.run(({ expectObservable }) => {
            const model = new AppContextViewModel(generalSettingsModelMock);
            expectObservable(model.appTheme$).toBe('a', { a: theme });
        });
    });

    describe('isLoading', () => {
        test('- is false (theme and translations are available)', () => {
            let model: AppContextViewModel;
            generalSettingsModelMock.appLangModel.translations$ = new Observable((observer) => observer.next(TEXTS_EN));
            generalSettingsModelMock.appThemeModel.theme = new Observable((observer) => observer.next(DARK_THEME));

            testScheduler.run(({ expectObservable }) => {
                model = new AppContextViewModel(generalSettingsModelMock);
                expectObservable(model.isLoading$).toBe('a', { a: false });
            });
        });

        test('- is true (theme and translations are both not available)', () => {
            let model: AppContextViewModel;
            generalSettingsModelMock.appLangModel.translations$ = new Observable((observer) =>
                observer.next(undefined),
            );
            generalSettingsModelMock.appThemeModel.theme = new Observable((observer) => observer.next(undefined));

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
            generalSettingsModelMock.appThemeModel.theme = new Observable((observer) => observer.next(DARK_THEME));

            testScheduler.run(({ expectObservable }) => {
                model = new AppContextViewModel(generalSettingsModelMock);
                expectObservable(model.isLoading$).toBe('a', { a: true });
            });
        });

        test('- is true (translations are available but theme is not)', () => {
            let model: AppContextViewModel;
            generalSettingsModelMock.appLangModel.translations$ = new Observable((observer) => observer.next(TEXTS_EN));
            generalSettingsModelMock.appThemeModel.theme = new Observable((observer) => observer.next(undefined));

            testScheduler.run(({ expectObservable }) => {
                model = new AppContextViewModel(generalSettingsModelMock);
                expectObservable(model.isLoading$).toBe('a', { a: true });
            });
        });
    });

    test('setDefaultValues', () => {
        const model = new AppContextViewModel(generalSettingsModelMock);
        const result = model.setDefaultValues();

        expect(generalSettingsModelMock.setDefaultValues).toHaveBeenCalledTimes(1);
        expect(result).toBe(true);
    });

    test('changeAppLang', () => {
        const lang = AppLangs.PL;
        const model = new AppContextViewModel(generalSettingsModelMock);
        model.changeAppLang(lang);

        expect(generalSettingsModelMock.appLangModel.changeAppLang).toHaveBeenCalledTimes(1);
        expect(generalSettingsModelMock.appLangModel.changeAppLang).toHaveBeenCalledWith(lang);
    });

    test('toggleAppTheme', () => {
        const model = new AppContextViewModel(generalSettingsModelMock);
        model.toggleAppTheme();
        expect(generalSettingsModelMock.appThemeModel.toggleAppTheme).toHaveBeenCalledTimes(1);
    });

    test('Should set is loading manually (from default to false)', () => {
        testScheduler.run(({ cold, expectObservable }) => {
            const model = new AppContextViewModel(generalSettingsModelMock);
            cold(EMIT_PATTERN).subscribe(() => model.setIsLoading(false));
            expectObservable(model.isLoading$).toBe('ab', { a: true, b: false });
        });
    });

    test('Should set is loading manually (from default to false)', () => {
        testScheduler.run(({ cold, expectObservable }) => {
            const model = new AppContextViewModel(generalSettingsModelMock);
            cold(EMIT_PATTERN).subscribe(() => model.setIsLoading(true));
            expectObservable(model.isLoading$).toBe('ab', { a: true, b: true });
        });
    });
});

export {};
