import React, { useEffect } from 'react';

import { DEFAULTS } from '../defaults';
import { useStateWithObservableWithInit } from '../tools';
import { IAppContextViewModel, Models, TAppContext, TTranslations } from '../types';

import { AppContext } from './AppContext';
import { getModelByKey } from './models';

type Props = React.PropsWithChildren<unknown>;

export const AppContextWrapper: React.FC<Props> = ({ children }) => {
    const viewModel = getModelByKey<IAppContextViewModel>(Models.APP_CONTEXT_VIEW_MODEL);

    const theme = useStateWithObservableWithInit(viewModel.theme$, DEFAULTS.THEME);
    const translations = useStateWithObservableWithInit(viewModel.translations$, {} as TTranslations);
    const isLoading = useStateWithObservableWithInit(viewModel.isLoading$, true);

    useEffect(() => {
        viewModel.setDefaultValues();
    }, []);

    const value: TAppContext = {
        theme,
        translations,
        isLoading,
    };

    return (
        <AppContext.Provider value={value}>
            <>{children}</>
        </AppContext.Provider>
    );
};
