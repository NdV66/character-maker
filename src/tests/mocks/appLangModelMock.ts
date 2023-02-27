import { Observable, Subject } from 'rxjs';
import { DEFAULTS } from '../../defaults';

export const appLangModelMock = () => ({
    appLang$: new Subject(),
    translations$: new Observable(),

    setDefaultValue: jest.fn(),
    changeAppLang: jest.fn(),
});

export const appLangPureModelMock = (appLang = DEFAULTS.LANG) => ({
    appLang,

    setDefaultValue: jest.fn(),
    changeAppLang: jest.fn(),
});
