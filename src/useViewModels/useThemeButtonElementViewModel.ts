import { getModelByKey } from '../context';
import { useStateWithObservable } from '../tools/useStateWithObservable';
import { Models, IThemeButtonElementViewModel } from '../types';

export const useThemeButtonElementViewModel = () => {
    const viewModel = getModelByKey<IThemeButtonElementViewModel>(Models.THEME_BUTTON_ELEMENT_VIEW_MODEL);
    const appTheme = useStateWithObservable(viewModel.appTheme$);
    const translations = useStateWithObservable(viewModel.translations$);

    return {
        onChangeTheme: viewModel.toggleAppTheme,
        appTheme,
        translations,
    };
};
