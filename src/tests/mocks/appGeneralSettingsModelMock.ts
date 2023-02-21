import { Observable } from 'rxjs';
import { AppLangs, AppTheme, TTheme, TTranslations } from '../../types';
import { appLangModelMock } from './appLangModelMock';
import { appThemeModelMock } from './appThemeModelMock';

export const appGeneralSettingsModelMock = () => ({
    appThemeModel: appThemeModelMock(),
    appLangModel: appLangModelMock(),

    setDefaultValues: jest.fn(),
});

export const appContextViewModelMock = () => ({
    theme$: new Observable<TTheme>(),
    appTheme$: new Observable<AppTheme>(),
    translations$: new Observable<TTranslations>(),
    isLoading$: new Observable<boolean>(),
    appLang$: new Observable<AppLangs>(),

    setDefaultValues: jest.fn(),
    setIsLoading: jest.fn(),
    changeAppLang: jest.fn(),
    toggleAppTheme: jest.fn(),
});
