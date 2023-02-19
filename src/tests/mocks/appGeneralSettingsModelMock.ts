import { appLangModelMock } from './appLangModelMock';
import { appThemeModelMock } from './appThemeModelMock';

export const appGeneralSettingsModelMock = () => ({
    appThemeModel: appThemeModelMock(),
    appLangModel: appLangModelMock(),

    setDefaultValues: jest.fn(),
});
