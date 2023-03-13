import { AppTheme, IAppContextViewModel } from '../../../types';
import { appContextViewModelMock } from '../../mocks';
import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { ThemeButtonElementViewModel } from '../../../models';
import { TEXTS_EN } from '../../../langs/en';
import { DARK_THEME } from '../../../styles';

describe('ThemeButtonElementViewModel', () => {
    let appContextViewModel: IAppContextViewModel;
    let testScheduler: TestScheduler;

    beforeEach(() => {
        appContextViewModel = appContextViewModelMock() as any as IAppContextViewModel;
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });
    });

    test('Should return current appTheme$', () => {
        const theme = AppTheme.DARK;
        appContextViewModel.appTheme$ = new Observable((observer) => observer.next(theme));

        testScheduler.run(({ expectObservable }) => {
            const model = new ThemeButtonElementViewModel(appContextViewModel);
            expectObservable(model.appTheme$).toBe('a', { a: theme });
        });
    });

    test('Should return current theme$', () => {
        const theme = DARK_THEME;
        appContextViewModel.theme$ = new Observable((observer) => observer.next(theme));

        testScheduler.run(({ expectObservable }) => {
            const model = new ThemeButtonElementViewModel(appContextViewModel);
            expectObservable(model.theme$).toBe('a', { a: theme });
        });
    });

    test('Should return current translations$', () => {
        const lang = TEXTS_EN;
        appContextViewModel.translations$ = new Observable((observer) => observer.next(lang));

        testScheduler.run(({ expectObservable }) => {
            const model = new ThemeButtonElementViewModel(appContextViewModel);
            expectObservable(model.translations$).toBe('a', { a: lang });
        });
    });

    test('Should call toggleAppTheme', () => {
        appContextViewModel.toggleAppTheme = jest.fn();
        const model = new ThemeButtonElementViewModel(appContextViewModel);
        model.toggleAppTheme();

        expect(appContextViewModel.toggleAppTheme).toHaveBeenCalledTimes(1);
    });
});

export {};
