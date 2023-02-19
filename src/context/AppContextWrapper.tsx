import React, { useEffect } from 'react';
import { BehaviorSubject } from 'rxjs';
import { DEFAULTS } from '../defaults';
import { AppLangModel } from '../models/AppLangModel';
import { AppThemeModel } from '../models/AppThemeModel';
import { useStateWithObservableWithInit } from '../tools';
import { Models, TAppContext, TTheme, TTranslations } from '../types';
import { AppContext } from './AppContext';
import { getModelByKey } from './models';

type Props = React.PropsWithChildren<unknown>;

export const AppContextWrapper: React.FC<Props> = ({ children }) => {
    const _isLoadingSource = new BehaviorSubject<boolean>(true);
    const _appLangModel = getModelByKey<AppLangModel>(Models.APP_LANG);
    const _appThemeModel = getModelByKey<AppThemeModel>(Models.APP_THEME);

    const theme = useStateWithObservableWithInit<TTheme>(_appThemeModel.theme, DEFAULTS.THEME);
    const translations = useStateWithObservableWithInit<TTranslations>(_appLangModel.translations, {} as TTranslations);
    const isLoading = useStateWithObservableWithInit<boolean>(_isLoadingSource, true);

    useEffect(() => {
        _appLangModel.setDefaultValue();
        _appThemeModel.setDefaultValue();
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
