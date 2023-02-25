import { AppLangs, IAppContextViewModel, TTranslationsLang } from '../../../types';
import { appContextViewModelMock } from '../../mocks';
import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { ChangeLangElementViewModel } from '../../../models/viewModels/ChangeLangElementViewModel';
import { TEXTS_EN } from '../../../langs/en';

describe('AppContextViewModel', () => {
    let appContextViewModelMok: IAppContextViewModel;
    let testScheduler: TestScheduler;

    beforeEach(() => {
        appContextViewModelMok = appContextViewModelMock() as any as IAppContextViewModel;
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });
    });

    test('Should return current appLang$', () => {
        const lang = AppLangs.PL;
        appContextViewModelMok.appLang$ = new Observable((observer) => observer.next(lang));

        testScheduler.run(({ expectObservable }) => {
            const model = new ChangeLangElementViewModel(appContextViewModelMok);
            expectObservable(model.appLang$).toBe('a', { a: lang });
        });
    });

    test('Should call changeAppLang', () => {
        const lang = AppLangs.EN;
        const model = new ChangeLangElementViewModel(appContextViewModelMok);
        model.changeAppLang(lang);

        expect(appContextViewModelMok.changeAppLang).toHaveBeenCalledTimes(1);
        expect(appContextViewModelMok.changeAppLang).toHaveBeenCalledWith(lang);
    });

    test('Should map to item correctly', () => {
        const lang: TTranslationsLang = {
            label: 'Polski',
            value: AppLangs.PL,
        };
        const expectedResult = { key: lang.value, label: lang.label };
        const model = new ChangeLangElementViewModel(appContextViewModelMok);

        const result = model['_mapToItem'](lang);
        expect(result).toEqual(expectedResult);
    });

    test('Should prepare items$ correctly', () => {
        const expectedResult = [
            { key: 'en-EN', label: 'English' },
            { key: 'pl-PL', label: 'Polski' },
        ];
        appContextViewModelMok.translations$ = new Observable((observer) => observer.next(TEXTS_EN));

        testScheduler.run(({ expectObservable }) => {
            const model = new ChangeLangElementViewModel(appContextViewModelMok);
            expectObservable(model.items$).toBe('a', { a: expectedResult });
        });
    });
});

export {};
