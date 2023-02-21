import { getModelByKey } from '../context';
import { DEFAULTS } from '../defaults';
import { useStateWithObservable, useStateWithObservableWithInit } from '../tools';
import { AppTheme, Models, IPageViewModel } from '../types';
import { useEffect } from 'react';

export const usePageViewModel = () => {
    const viewModel = getModelByKey<IPageViewModel>(Models.PAGE_VIEW_MODEL);
    const theme = useStateWithObservableWithInit(viewModel.theme$, DEFAULTS.THEME);
    const appTheme = useStateWithObservable(viewModel.appTheme$);
    const translations = useStateWithObservableWithInit(viewModel.translations$, DEFAULTS.TRANSLATIONS);
    const isLoading = useStateWithObservable(viewModel.isLoading$);

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

    useEffect(() => {
        viewModel.setDefaultValues();
    });

    return {
        antdTheme: preparedTheme,
        translations,
        theme,
        appTheme,
        isLoading,
    };
};
