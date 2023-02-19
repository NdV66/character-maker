import { getModelByKey, useAppContext } from '../context';
import { useStateWithObservable } from '../tools/useStateWithObservable';
import { Models, IAppGeneralSettings } from '../types';

export const useThemeButtonElementViewModel = () => {
    const { appThemeModel } = getModelByKey<IAppGeneralSettings>(Models.APP_GENERAL_SETTINGS);
    const { translations } = useAppContext();
    const appTheme = useStateWithObservable(appThemeModel.appTheme);

    return {
        onChangeTheme: appThemeModel.toggleAppTheme,
        appTheme,
        translations,
    };
};
