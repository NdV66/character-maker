import { TestScheduler } from 'rxjs/testing';
import { langManager } from '../../../context/langManager';
import { DEFAULTS } from '../../../defaults';
import { TEXTS_PL } from '../../../langs/pl';
import { AppLangModel } from '../../../models/context/AppLangModel';
import { AppLangs } from '../../../types';
import { appLangPureModelMock } from '../../mocks/appLangModelMock';

describe('AppLangModel', () => {
    const appLangPureModel = appLangPureModelMock();
    let model: AppLangModel;
    let testScheduler: TestScheduler;

    beforeEach(() => {
        model = new AppLangModel(appLangPureModel, langManager);
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });
    });

    test('Should set default values', () => {
        model.setDefaultValue();
        expect(appLangPureModel.setDefaultValue).toHaveBeenCalledTimes(1);
    });

    test('Should change app lang', () => {
        const lang = AppLangs.EN;
        model.changeAppLang(lang);
        expect(appLangPureModel.changeAppLang).toHaveBeenCalledWith(lang);
    });

    test('Should update app lang correctly', () => {
        const lang = AppLangs.PL;

        testScheduler.run(({ expectObservable, cold }) => {
            cold('-a').subscribe(() => model.changeAppLang(lang));
            expectObservable(model['_appLang$']).toBe('ab', { a: DEFAULTS.LANG, b: lang });
            expectObservable(model.appLang$).toBe('ab', { a: DEFAULTS.LANG, b: lang });
        });
    });

    test('Should return correct translate based on current app lang (after change)', () => {
        const lang = AppLangs.PL;

        testScheduler.run(({ expectObservable, cold }) => {
            cold('-a').subscribe(() => model.changeAppLang(lang));
            expectObservable(model['_translations$']).toBe('ab', { a: DEFAULTS.TRANSLATIONS, b: TEXTS_PL });
            expectObservable(model.translations$).toBe('ab', { a: DEFAULTS.TRANSLATIONS, b: TEXTS_PL });
        });
    });
});

export {};
