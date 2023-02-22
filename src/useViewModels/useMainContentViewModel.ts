import { getModelByKey } from '../context';
import { DEFAULTS } from '../defaults';
import { useStateWithObservableWithInit } from '../tools';
import { IMainContentViewModel, Models } from '../types';

export const useMainContentViewModel = () => {
    const viewModel = getModelByKey<IMainContentViewModel>(Models.MAIN_CONTENT_VIEW_MODEL);
    const theme = useStateWithObservableWithInit(viewModel.theme$, DEFAULTS.THEME);
    const translations = useStateWithObservableWithInit(viewModel.translations$, DEFAULTS.TRANSLATIONS);

    return {
        theme,
        translations,
    };
};
