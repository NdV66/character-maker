import * as cookiesService from '../../services/cookies.service';

import { AppLangs } from '../../types';
import { AppLangModel, getLangFromManager } from '../../models/AppLangModel';
import { TestScheduler } from 'rxjs/testing';
import { DEFAULTS } from '../../defaults';

const EMIT_PATTERN = '-a';

describe('AppLangModel', () => {
    let testScheduler: TestScheduler;
    let model: AppLangModel;

    beforeEach(() => {
        model = new AppLangModel();
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });
    });

    describe('changeAppLang', () => {
        test('Should change app lang (short name)', () => {
            testScheduler.run(({ cold, expectObservable }) => {
                const expectedLang = AppLangs.PL;
                cold(EMIT_PATTERN).subscribe(() => model.changeAppLang(expectedLang));
                expectObservable(model.appLang).toBe(EMIT_PATTERN, { a: expectedLang });
            });
        });

        test('Should change app lang (full translations)', () => {
            testScheduler.run(({ cold, expectObservable }) => {
                const lang = AppLangs.PL;
                const expectedValue = getLangFromManager(lang);
                cold(EMIT_PATTERN).subscribe(() => model.changeAppLang(lang));

                expectObservable(model.translations).toBe(EMIT_PATTERN, { a: expectedValue });
            });
        });
    });

    describe('setDefaultValue', () => {
        test('when there is no saved data', () => {
            const expectedLang = DEFAULTS.LANG;
            jest.spyOn(cookiesService, 'getFromCookies').mockReturnValue(undefined as any);

            testScheduler.run(({ cold, expectObservable }) => {
                cold(EMIT_PATTERN).subscribe(() => model.setDefaultValue());
                expectObservable(model.appLang).toBe(EMIT_PATTERN, { a: expectedLang });
            });
        });

        test('when there is a saved data', () => {
            const expectedLang = AppLangs.PL;
            jest.spyOn(cookiesService, 'getFromCookies').mockReturnValue(expectedLang as any);

            testScheduler.run(({ cold, expectObservable }) => {
                cold(EMIT_PATTERN).subscribe(() => model.setDefaultValue());
                expectObservable(model.appLang).toBe(EMIT_PATTERN, { a: expectedLang });
            });
        });
    });
});

export {};
