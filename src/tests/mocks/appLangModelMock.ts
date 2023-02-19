import { Observable, Subject } from 'rxjs';

export const appLangModelMock = () => ({
    appLang: new Subject(),
    translations: new Observable(),

    setDefaultValue: jest.fn(),
    changeAppLang: jest.fn(),
});
