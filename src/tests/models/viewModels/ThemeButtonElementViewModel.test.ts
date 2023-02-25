import { AppTheme, IAppContextViewModel } from '../../../types';
import { appContextViewModelMock } from '../../mocks';
import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { ThemeButtonElementViewModel } from '../../../models';
import { TEXTS_EN } from '../../../langs/en';

describe('ThemeButtonElementViewModel', () => {
    let appContextViewModelMok: IAppContextViewModel;
    let testScheduler: TestScheduler;

    beforeEach(() => {
        appContextViewModelMok = appContextViewModelMock() as any as IAppContextViewModel;
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });
    });

    test('Should return current appTheme$', () => {
        const theme = AppTheme.DARK;
        appContextViewModelMok.appTheme$ = new Observable((observer) => observer.next(theme));

        testScheduler.run(({ expectObservable }) => {
            const model = new ThemeButtonElementViewModel(appContextViewModelMok);
            expectObservable(model.appTheme$).toBe('a', { a: theme });
        });
    });

    test('Should return current translations$', () => {
        const lang = TEXTS_EN;
        appContextViewModelMok.translations$ = new Observable((observer) => observer.next(lang));

        testScheduler.run(({ expectObservable }) => {
            const model = new ThemeButtonElementViewModel(appContextViewModelMok);
            expectObservable(model.translations$).toBe('a', { a: lang });
        });
    });

    test('Should call toggleAppTheme', () => {
        appContextViewModelMok.toggleAppTheme = jest.fn();
        const model = new ThemeButtonElementViewModel(appContextViewModelMok);
        model.toggleAppTheme();

        expect(appContextViewModelMok.toggleAppTheme).toHaveBeenCalledTimes(1);
    });
});

export {};
