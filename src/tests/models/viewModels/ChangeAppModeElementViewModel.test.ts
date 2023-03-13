import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { ChangeAppModeElementViewModel } from '../../../models';
import { IAppContextViewModel } from '../../../types';
import { appContextViewModelMock } from '../../mocks';
import { DARK_THEME } from '../../../styles';
import { TEXTS_EN } from '../../../langs/en';

describe('ChangeAppModeElementViewModel', () => {
    let model: ChangeAppModeElementViewModel;
    let appContextMock: IAppContextViewModel;
    let testScheduler: TestScheduler;

    beforeEach(() => {
        appContextMock = appContextViewModelMock();
        model = new ChangeAppModeElementViewModel(appContextMock);

        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });
    });

    test('Should return current isFreeHandMode$', () => {
        const value = true;
        appContextMock.isFreeHandMode$ = new Observable((observer) => observer.next(value));

        testScheduler.run(({ expectObservable }) => {
            expectObservable(model.isFreeHandMode$).toBe('a', { a: value });
        });
    });

    test('Should return current theme$', () => {
        const theme = DARK_THEME;
        appContextMock.theme$ = new Observable((observer) => observer.next(theme));

        testScheduler.run(({ expectObservable }) => {
            expectObservable(model.theme$).toBe('a', { a: theme });
        });
    });

    test('Should return current translations$', () => {
        const translations = TEXTS_EN;
        appContextMock.translations$ = new Observable((observer) => observer.next(translations));

        testScheduler.run(({ expectObservable }) => {
            expectObservable(model.translations$).toBe('a', { a: translations });
        });
    });

    test('Should toggle free hand mode (from default to true)', () => {
        const expectedValue = true;
        appContextMock.isFreeHandMode$ = new Observable((observer) => observer.next(expectedValue));

        testScheduler.run(({ expectObservable, cold }) => {
            cold('-a').subscribe(() => model.toggleIsFreeHandMode());
            expectObservable(model.isFreeHandMode$).toBe('a', { a: expectedValue });
        });
    });
});

export {};
