import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { TEXTS_EN } from '../../../langs/en';
import { PageViewModel } from '../../../models';
import { DARK_THEME } from '../../../styles';
import { AppLangs, AppTheme, IAppContextViewModel } from '../../../types';
import { appContextViewModelMock } from '../../mocks';

describe('PageViewModel', () => {
    let model: PageViewModel;
    let appContext: IAppContextViewModel;
    let testScheduler: TestScheduler;

    beforeEach(() => {
        appContext = appContextViewModelMock();
        model = new PageViewModel(appContext);

        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });
    });

    test('Should return current translations$', () => {
        const translations = TEXTS_EN;
        appContext.translations$ = new Observable((observer) => observer.next(translations));

        testScheduler.run(({ expectObservable }) => {
            expectObservable(model.translations$).toBe('a', { a: translations });
        });
    });

    test('Should return current appLang$', () => {
        const appLang = AppLangs.EN;
        appContext.appLang$ = new Observable((observer) => observer.next(appLang));

        testScheduler.run(({ expectObservable }) => {
            expectObservable(model.appLang$).toBe('a', { a: appLang });
        });
    });

    test('Should return current appTheme$', () => {
        const appTheme = AppTheme.DARK;
        appContext.appTheme$ = new Observable((observer) => observer.next(appTheme));

        testScheduler.run(({ expectObservable }) => {
            expectObservable(model.appTheme$).toBe('a', { a: appTheme });
        });
    });

    test('Should return current theme$', () => {
        const theme = DARK_THEME;
        appContext.theme$ = new Observable((observer) => observer.next(theme));

        testScheduler.run(({ expectObservable }) => {
            expectObservable(model.theme$).toBe('a', { a: theme });
        });
    });

    test('Should return current isLoading$', () => {
        const isLoading = true;
        appContext.isLoading$ = new Observable((observer) => observer.next(isLoading));

        testScheduler.run(({ expectObservable }) => {
            expectObservable(model.isLoading$).toBe('a', { a: isLoading });
        });
    });

    test('Should set default values (setDefaultValues)', () => {
        model.setDefaultValues();
        expect(appContext.setDefaultValues).toHaveBeenCalled();
    });
});

export {};
