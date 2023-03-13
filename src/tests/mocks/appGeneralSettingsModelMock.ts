import { Observable, of } from 'rxjs';
import { AppLangs, AppTheme, IAppContextViewModel, IAppGeneralSettings, TTheme, TTranslations } from '../../types';
import { appLangModelMock } from './appLangModelMock';
import { appThemeModelMock } from './appThemeModelMock';

export const appGeneralSettingsModelMock = () =>
    ({
        appThemeModel: appThemeModelMock(),
        appLangModel: appLangModelMock(),
        isFreeHandMode: false,

        setDefaultValues: jest.fn(),
    } as IAppGeneralSettings);

export const appContextViewModelMock = () =>
    ({
        theme$: new Observable<TTheme>(),
        appTheme$: new Observable<AppTheme>(),
        translations$: new Observable<TTranslations>(),
        isLoading$: of(false),
        appLang$: new Observable<AppLangs>(),
        isFreeHandMode$: of(false),

        setDefaultValues: jest.fn(),
        setIsLoading: jest.fn(),
        changeAppLang: jest.fn(),
        toggleAppTheme: jest.fn(),
        setIsFreeHandMode: jest.fn(),
    } as IAppContextViewModel);
