import React, { useEffect, useMemo } from 'react';

import { DEFAULTS } from '../defaults';
import { AppContextViewModel } from '../models/viewModels/AppContextViewModel';
import { useStateWithObservableWithInit } from '../tools';
import { TAppContext, TTranslations } from '../types';

import { AppContext } from './AppContext';

type Props = React.PropsWithChildren<unknown>;

export const AppContextWrapper: React.FC<Props> = ({ children }) => {
    const viewModel = useMemo(() => new AppContextViewModel(), []);

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
