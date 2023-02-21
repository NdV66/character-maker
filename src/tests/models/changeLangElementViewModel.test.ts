// import { AppLangs, IAppGeneralSettings, TTranslationsLang } from '../../types';
// import { appGeneralSettingsModelMock } from '../mocks';
// import * as modelsTools from '../../context/models';
// import { Observable } from 'rxjs';
// import { TestScheduler } from 'rxjs/testing';
// import { ChangeLangElementViewModel } from '../../models/viewModels/ChangeLangElementViewModel';
// import { TEXTS_EN } from '../../langs/en';

// describe('AppContextViewModel', () => {
//     let generalSettingsModelMock: IAppGeneralSettings;
//     let testScheduler: TestScheduler;

//     beforeEach(() => {
//         generalSettingsModelMock = appGeneralSettingsModelMock() as any as IAppGeneralSettings;
//         jest.spyOn(modelsTools, 'getModelByKey').mockReturnValue(generalSettingsModelMock);
//         testScheduler = new TestScheduler((actual, expected) => {
//             expect(actual).toEqual(expected);
//         });
//     });

//     test('Should return current appLang$', () => {
//         const lang = AppLangs.PL;
//         generalSettingsModelMock.appLangModel.appLang = new Observable((observer) => observer.next(lang));

//         testScheduler.run(({ expectObservable }) => {
//             const model = new ChangeLangElementViewModel();
//             expectObservable(model.appLang$).toBe('a', { a: lang });
//         });
//     });

//     test('Should call changeAppLang', () => {
//         const lang = AppLangs.EN;
//         const model = new ChangeLangElementViewModel();
//         model.changeAppLang(lang);

//         expect(generalSettingsModelMock.appLangModel.changeAppLang).toHaveBeenCalledTimes(1);
//         expect(generalSettingsModelMock.appLangModel.changeAppLang).toHaveBeenCalledWith(lang);
//     });

//     test('Should map to item correctly', () => {
//         const lang: TTranslationsLang = {
//             label: 'Polski',
//             value: AppLangs.PL,
//         };
//         const expectedResult = { key: lang.value, label: lang.label };
//         const model = new ChangeLangElementViewModel();

//         const result = model['_mapToItem'](lang);
//         expect(result).toEqual(expectedResult);
//     });

//     test('Should prepare items$ correctly', () => {
//         const expectedResult = [
//             { key: 'en-EN', label: 'English' },
//             { key: 'pl-PL', label: 'Polski' },
//         ];
//         generalSettingsModelMock.appLangModel.translations = new Observable((observer) => observer.next(TEXTS_EN));

//         testScheduler.run(({ expectObservable }) => {
//             const model = new ChangeLangElementViewModel();
//             expectObservable(model.items$).toBe('a', { a: expectedResult });
//         });
//     });
// });

export {};
