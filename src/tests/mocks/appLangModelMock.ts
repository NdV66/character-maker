import { Observable, Subject } from 'rxjs';
import { DEFAULTS } from '../../defaults';
import { IAppLang, IAppLangPure } from '../../types';

export const appLangModelMock = () =>
    ({
        appLang$: new Subject(),
        translations$: new Observable(),

        setDefaultValue: jest.fn(),
        changeAppLang: jest.fn(),
    } as IAppLang);

export const appLangPureModelMock = (appLang = DEFAULTS.LANG) =>
    ({
        appLang,

        setDefaultValue: jest.fn(),
        changeAppLang: jest.fn(),
    } as IAppLangPure);
