import { Observable } from 'rxjs';
import { DEFAULTS } from '../../defaults';
import { IAppTheme, IAppThemePure } from '../../types';

export const appThemeModelMock = () =>
    ({
        appTheme$: new Observable(),
        theme$: new Observable(),

        setDefaultValue: jest.fn(),
        toggleAppTheme: jest.fn(),
    } as IAppTheme);

export const appThemePureModelMock = (appTheme = DEFAULTS.APP_THEME) =>
    ({
        appTheme,

        setDefaultValue: jest.fn(),
        changeAppTheme: jest.fn(),
        getNewAppTheme: jest.fn(),
        getTheme: jest.fn(),
    } as IAppThemePure);
