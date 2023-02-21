import { getModelByKey } from '../context';
import { DEFAULTS } from '../defaults';
import { useStateWithObservableWithInit } from '../tools';
import { IFooterViewModel, Models } from '../types';

export const useFooterViewModel = () => {
    const viewModel = getModelByKey<IFooterViewModel>(Models.FOOTER_VIEW_MODEL);
    const translations = useStateWithObservableWithInit(viewModel.translations$, DEFAULTS.TRANSLATIONS);
    const theme = useStateWithObservableWithInit(viewModel.theme$, DEFAULTS.THEME);

    return {
        translations,
        theme,
        version: viewModel.version,
    };
};
