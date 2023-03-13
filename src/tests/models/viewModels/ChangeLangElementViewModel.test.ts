import { AppLangs, IAppContextViewModel, TTranslationsLang } from '../../../types';
import { appContextViewModelMock } from '../../mocks';
import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { ChangeLangElementViewModel } from '../../../models';
import { TEXTS_EN } from '../../../langs/en';

describe('AppContextViewModel', () => {
    let appContextViewModel: IAppContextViewModel;
    let testScheduler: TestScheduler;

    beforeEach(() => {
        appContextViewModel = appContextViewModelMock() as any as IAppContextViewModel;
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });
    });

    test('Should return current appLang$', () => {
        const lang = AppLangs.PL;
        appContextViewModel.appLang$ = new Observable((observer) => observer.next(lang));

        testScheduler.run(({ expectObservable }) => {
            const model = new ChangeLangElementViewModel(appContextViewModel);
            expectObservable(model.appLang$).toBe('a', { a: lang });
        });
    });

    test('Should call changeAppLang', () => {
        const lang = AppLangs.EN;
        const model = new ChangeLangElementViewModel(appContextViewModel);
        model.changeAppLang(lang);

        expect(appContextViewModel.changeAppLang).toHaveBeenCalledTimes(1);
        expect(appContextViewModel.changeAppLang).toHaveBeenCalledWith(lang);
    });

    test('Should map to item correctly', () => {
        const lang: TTranslationsLang = {
            label: 'Polski',
            value: AppLangs.PL,
        };
        const expectedResult = { key: lang.value, label: lang.label };
        const model = new ChangeLangElementViewModel(appContextViewModel);

        const result = model['_mapToItem'](lang);
        expect(result).toEqual(expectedResult);
    });

    test('Should prepare items$ correctly', () => {
        const expectedResult = [
            { key: 'en-EN', label: 'English' },
            { key: 'pl-PL', label: 'Polski' },
        ];
        appContextViewModel.translations$ = new Observable((observer) => observer.next(TEXTS_EN));

        testScheduler.run(({ expectObservable }) => {
            const model = new ChangeLangElementViewModel(appContextViewModel);
            expectObservable(model.items$).toBe('a', { a: expectedResult });
        });
    });
});

export {};
