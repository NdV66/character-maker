import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { TEXTS_EN } from '../../../langs/en';
import { MainContentViewModel } from '../../../models';
import { DARK_THEME } from '../../../styles';
import { IAppContextViewModel } from '../../../types';
import { appContextViewModelMock } from '../../mocks';

describe('MainContentViewModel', () => {
    let model: MainContentViewModel;
    let appContext: IAppContextViewModel;
    let testScheduler: TestScheduler;

    beforeEach(() => {
        appContext = appContextViewModelMock();
        model = new MainContentViewModel(appContext);

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

    test('Should return current theme$', () => {
        const theme = DARK_THEME;
        appContext.theme$ = new Observable((observer) => observer.next(theme));

        testScheduler.run(({ expectObservable }) => {
            expectObservable(model.theme$).toBe('a', { a: theme });
        });
    });
});

export {};
