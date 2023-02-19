import { getModelByKey, useAppContext } from '../context';
import { AppThemeModel } from '../models/AppThemeModel';
import { useStateWithObservable } from '../tools/useStateWithObservable';
import { Models } from '../types';

export const useThemeButtonElementViewModel = () => {
    const appThemeModel = getModelByKey<AppThemeModel>(Models.APP_THEME);
    const { translations } = useAppContext();
    const appTheme = useStateWithObservable(appThemeModel.appTheme);

    return {
        onChangeTheme: appThemeModel.toggleAppTheme,
        appTheme,
        translations,
    };
};
