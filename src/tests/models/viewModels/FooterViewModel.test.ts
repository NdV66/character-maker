import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { TEXTS_EN } from '../../../langs/en';
import { FooterViewModel } from '../../../models';
import { DARK_THEME } from '../../../styles';
import { IAppContextViewModel } from '../../../types';
import { appContextViewModelMock } from '../../mocks';
import packageInfo from '../../../../package.json';

describe('FooterViewModel', () => {
    let testScheduler: TestScheduler;
    let model: FooterViewModel;
    let appContext: IAppContextViewModel;

    beforeEach(() => {
        appContext = appContextViewModelMock();
        model = new FooterViewModel(appContext);

        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });
    });

    test('Should return current version from package', () => {
        const version = 'v6.6.8';
        packageInfo.version = version;

        expect(model.version).toBe(version);
    });

    test('Should return current theme$', () => {
        const theme = DARK_THEME;
        appContext.theme$ = new Observable((observer) => observer.next(theme));

        testScheduler.run(({ expectObservable }) => {
            expectObservable(model.theme$).toBe('a', { a: theme });
        });
    });

    test('Should return current translations$', () => {
        const translations = TEXTS_EN;
        appContext.translations$ = new Observable((observer) => observer.next(translations));

        testScheduler.run(({ expectObservable }) => {
            expectObservable(model.translations$).toBe('a', { a: translations });
        });
    });
});

export {};
