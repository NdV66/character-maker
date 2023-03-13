import { getModelByKey } from '../context';
import { DEFAULTS } from '../defaults';
import { useStateWithObservableWithInit } from '../tools';
import { useStateWithObservable } from '../tools/useStateWithObservable';
import { Models, IThemeButtonElementViewModel } from '../types';

export const useThemeButtonElementViewModel = () => {
    const viewModel = getModelByKey<IThemeButtonElementViewModel>(Models.THEME_BUTTON_ELEMENT_VIEW_MODEL);
    const appTheme = useStateWithObservable(viewModel.appTheme$);
    const translations = useStateWithObservableWithInit(viewModel.translations$, DEFAULTS.TRANSLATIONS);
    const theme = useStateWithObservableWithInit(viewModel.theme$, DEFAULTS.THEME);

    return {
        onChangeTheme: viewModel.toggleAppTheme,
        appTheme,
        translations,
        theme,
    };
};
