import { getModelByKey } from '../context';
import { DEFAULTS } from '../defaults';
import { useStateWithObservable } from '../tools';
import { AppTheme, Models, IPageViewModel } from '../types';
import { useEffect } from 'react';

// type TThemeToken = {
//     token: {
//         colorPrimary: string;
//         colorBgBase: string;
//         fontSize: number;
//         colorTextBase: string;
//         colorInfo: string;
//         colorWarning: string;
//         themeError: string;
//     };
// };

export const usePageViewModel = () => {
    const viewModel = getModelByKey<IPageViewModel>(Models.PAGE_VIEW_MODEL);
    const theme = useStateWithObservable(viewModel.theme$);
    const appTheme = useStateWithObservable(viewModel.appTheme$);
    const translations = useStateWithObservable(viewModel.translations$);
    const isLoading = useStateWithObservable(viewModel.isLoading$);

    const preparedTheme = theme && {
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

    useEffect(() => {
        viewModel.setDefaultValues();
    });

    return {
        antdTheme: preparedTheme,
        translations: translations || DEFAULTS.TRANSLATIONS,
        theme: theme || DEFAULTS.THEME,
        appTheme,
        isLoading,
    };
};
