import { Observable, Subject } from 'rxjs';
import { AppLangs } from '../../types';

export const appLangModelMock = () => ({
    appLang$: new Subject(),
    translations$: new Observable(),

    setDefaultValue: jest.fn(),
    changeAppLang: jest.fn(),
});

export const appLangPureModelMock = (appLang = AppLangs.PL) => ({
    appLang,

    setDefaultValue: jest.fn(),
    changeAppLang: jest.fn(),
});
