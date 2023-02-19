import { getModelByKey, useAppContext } from '../context';
import { useStateWithObservable } from '../tools';
import { AppTheme, Models, IAppGeneralSettings } from '../types';

export const usePageViewModel = () => {
    const { appThemeModel } = getModelByKey<IAppGeneralSettings>(Models.APP_GENERAL_SETTINGS);
    const { theme, translations, isLoading } = useAppContext();
    const appTheme = useStateWithObservable(appThemeModel.appTheme);

    const preparedTheme = {
        token: {
            colorPrimary: theme.primary,
            colorBgBase: theme.background,
            fontSize: theme.fontSize,
            colorTextBase: theme.primary,
            colorInfo: theme.primary,
            colorWarning: appTheme === AppTheme.LIGHT ? theme.accent : theme.primary,
            themeError: theme.accent,
        },
    };

    return {
        antdTheme: preparedTheme,
        translations,
        theme,
        appTheme,
        isLoading,
    };
};
