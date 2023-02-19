import * as cookiesService from '../../services/cookies.service';
import { AppTheme } from '../../types';
import { TestScheduler } from 'rxjs/testing';
import { DEFAULTS } from '../../defaults';
import { AppThemeModel } from '../../models/AppThemeModel';
import { firstValueFrom } from 'rxjs';
import { DARK_THEME } from '../../styles';

const EMIT_PATTERN = '-a';

describe('AppThemeModel', () => {
    let testScheduler: TestScheduler;
    let model: AppThemeModel;

    beforeEach(() => {
        model = new AppThemeModel();
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });
    });

    describe('toggleAppTheme', () => {
        beforeEach(() => {
            const startTheme = AppTheme.LIGHT;
            model['_appThemeSubject'].next(startTheme);
        });

        test('Should change app theme (short name)', async () => {
            const expectedTheme = AppTheme.DARK;
            await model.toggleAppTheme();

            const result = await firstValueFrom(model.appTheme);
            expect(result).toBe(expectedTheme);
        });

        test('Should change app theme (full translations)', async () => {
            const expectedTheme = DARK_THEME;
            await model.toggleAppTheme();

            const result = await firstValueFrom(model.theme);
            expect(result).toEqual(expectedTheme);
        });
    });

    describe('setDefaultValue', () => {
        test('when there is no saved data', () => {
            const expectedTheme = DEFAULTS.APP_THEME;
            jest.spyOn(cookiesService, 'getFromCookies').mockReturnValue(undefined as any);

            testScheduler.run(({ cold, expectObservable }) => {
                cold(EMIT_PATTERN).subscribe(() => model.setDefaultValue());
                expectObservable(model.appTheme).toBe(EMIT_PATTERN, { a: expectedTheme });
            });
        });

        test('when there is a saved data', () => {
            const expectedTheme = AppTheme.DARK;
            jest.spyOn(cookiesService, 'getFromCookies').mockReturnValue(expectedTheme as any);

            testScheduler.run(({ cold, expectObservable }) => {
                cold(EMIT_PATTERN).subscribe(() => model.setDefaultValue());
                expectObservable(model.appTheme).toBe(EMIT_PATTERN, { a: expectedTheme });
            });
        });
    });
});

export {};
