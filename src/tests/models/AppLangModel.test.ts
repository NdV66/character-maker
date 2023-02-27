import { TestScheduler } from 'rxjs/testing';
import { DEFAULTS } from '../../defaults';
import { AppLangModel } from '../../models/AppLangModel';
import { AppLangs } from '../../types';
import { appLangPureModelMock } from '../mocks/appLangModelMock';

describe('AppLangModel', () => {
    const appLangPureModel = appLangPureModelMock();
    let model: AppLangModel;
    let testScheduler: TestScheduler;

    beforeEach(() => {
        model = new AppLangModel(appLangPureModel);
        testScheduler = new TestScheduler((actual, expected) => {
            console.log('>>>', actual, expected);
            expect(actual).toEqual(expected);
        });
    });

    test('Should set default values', () => {
        model['_updateLangSubject'] = jest.fn();
        model.setDefaultValue();

        expect(appLangPureModel.setDefaultValue).toHaveBeenCalledTimes(1);
        expect(model['_updateLangSubject']).toHaveBeenCalledTimes(1);
    });

    test('Should change app lang', () => {
        const lang = AppLangs.EN;
        model['_updateLangSubject'] = jest.fn();

        model.changeAppLang(lang);

        expect(appLangPureModel.changeAppLang).toHaveBeenCalledWith(lang);
        expect(model['_updateLangSubject']).toHaveBeenCalledTimes(1);
    });

    // test('Should update app lang correctly', () => {
    //     const lang = AppLangs.PL;

    //     testScheduler.run(({ expectObservable }) => {
    //         model.changeAppLang(lang);
    //         expectObservable(model['_appLangSubject$']).toBe('ab', { a: DEFAULTS.LANG, b: lang });
    //     });
    // });
});

export {};
