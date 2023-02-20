import { AppContextViewModel } from '../../models/viewModels/AppContextViewModel';
import { IAppGeneralSettings } from '../../types';
import { appGeneralSettingsModelMock } from '../mocks';
import * as modelsTools from '../../context/models';
import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { DARK_THEME } from '../../styles';
import { TEXTS_EN } from '../../langs/en';

const EMIT_PATTERN = '-a';

describe('AppContextViewModel', () => {
    let generalSettingsModelMock: IAppGeneralSettings;
    let testScheduler: TestScheduler;

    beforeEach(() => {
        generalSettingsModelMock = appGeneralSettingsModelMock() as any as IAppGeneralSettings;
        jest.spyOn(modelsTools, 'getModelByKey').mockReturnValue(generalSettingsModelMock);
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });
    });

    test('Should return current theme', () => {
        const theme = DARK_THEME;
        generalSettingsModelMock.appThemeModel.theme = new Observable((observer) => observer.next(theme));

        testScheduler.run(({ expectObservable }) => {
            const model = new AppContextViewModel();
            expectObservable(model.theme).toBe('a', { a: theme });
        });
    });

    test('Should return current translations', () => {
        const translations = TEXTS_EN;
        generalSettingsModelMock.appLangModel.translations = new Observable((observer) => observer.next(translations));

        testScheduler.run(({ expectObservable }) => {
            const model = new AppContextViewModel();
            expectObservable(model.translations).toBe('a', { a: translations });
        });
    });

    describe('isLoading', () => {
        test('- is false (theme and translations are available)', () => {
            let model: AppContextViewModel;
            generalSettingsModelMock.appLangModel.translations = new Observable((observer) => observer.next(TEXTS_EN));
            generalSettingsModelMock.appThemeModel.theme = new Observable((observer) => observer.next(DARK_THEME));

            testScheduler.run(({ expectObservable }) => {
                model = new AppContextViewModel();
                expectObservable(model.isLoading).toBe('a', { a: false });
            });
        });

        test('- is true (theme and translations are both not available)', () => {
            let model: AppContextViewModel;
            generalSettingsModelMock.appLangModel.translations = new Observable((observer) => observer.next(undefined));
            generalSettingsModelMock.appThemeModel.theme = new Observable((observer) => observer.next(undefined));

            testScheduler.run(({ expectObservable }) => {
                model = new AppContextViewModel();
                expectObservable(model.isLoading).toBe('a', { a: true });
            });
        });

        test('- is true (theme is available but translations are not)', () => {
            let model: AppContextViewModel;
            generalSettingsModelMock.appLangModel.translations = new Observable((observer) => observer.next(undefined));
            generalSettingsModelMock.appThemeModel.theme = new Observable((observer) => observer.next(DARK_THEME));

            testScheduler.run(({ expectObservable }) => {
                model = new AppContextViewModel();
                expectObservable(model.isLoading).toBe('a', { a: true });
            });
        });

        test('- is true (translations are available but theme is not)', () => {
            let model: AppContextViewModel;
            generalSettingsModelMock.appLangModel.translations = new Observable((observer) => observer.next(TEXTS_EN));
            generalSettingsModelMock.appThemeModel.theme = new Observable((observer) => observer.next(undefined));

            testScheduler.run(({ expectObservable }) => {
                model = new AppContextViewModel();
                expectObservable(model.isLoading).toBe('a', { a: true });
            });
        });
    });

    test('Should set default values', () => {
        const model = new AppContextViewModel();
        const result = model.setDefaultValues();

        expect(generalSettingsModelMock.setDefaultValues).toHaveBeenCalledTimes(1);
        expect(result).toBe(true);
    });

    test('Should set is loading manually (from default to false)', () => {
        testScheduler.run(({ cold, expectObservable }) => {
            const model = new AppContextViewModel();
            cold(EMIT_PATTERN).subscribe(() => model.setIsLoading(false));
            expectObservable(model.isLoading).toBe('ab', { a: true, b: false });
        });
    });

    test('Should set is loading manually (from default to false)', () => {
        testScheduler.run(({ cold, expectObservable }) => {
            const model = new AppContextViewModel();
            cold(EMIT_PATTERN).subscribe(() => model.setIsLoading(true));
            expectObservable(model.isLoading).toBe('ab', { a: true, b: true });
        });
    });
});

export {};
