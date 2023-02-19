import React, { useEffect } from 'react';
import { BehaviorSubject } from 'rxjs';
import { DEFAULTS } from '../defaults';
import { useStateWithObservableWithInit } from '../tools';
import { Models, TAppContext, TTranslations } from '../types';
import { IAppGeneralSettings } from '../types/interfaces';
import { AppContext } from './AppContext';
import { getModelByKey } from './models';

type Props = React.PropsWithChildren<unknown>;

export const AppContextWrapper: React.FC<Props> = ({ children }) => {
    const _isLoadingSource = new BehaviorSubject<boolean>(true);
    const _appGeneralSettings = getModelByKey<IAppGeneralSettings>(Models.APP_GENERAL_SETTINGS);
    const _appLangModel = _appGeneralSettings.appLangModel;
    const _appThemeModel = _appGeneralSettings.appThemeModel;

    const theme = useStateWithObservableWithInit(_appThemeModel.theme, DEFAULTS.THEME);
    const translations = useStateWithObservableWithInit(_appLangModel.translations, {} as TTranslations);
    const isLoading = useStateWithObservableWithInit(_isLoadingSource, true);

    useEffect(() => {
        _appGeneralSettings.setDefaultValues();
        _isLoadingSource.next(false);
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
