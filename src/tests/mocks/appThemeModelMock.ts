import { Observable } from 'rxjs';

export const appThemeModelMock = () => ({
    appTheme: new Observable(),
    theme: new Observable(),

    setDefaultValue: jest.fn(),
    toggleAppTheme: jest.fn(),
});
