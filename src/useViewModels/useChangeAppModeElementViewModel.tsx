import { getModelByKey } from '../context';
import { DEFAULTS } from '../defaults';
import { useStateWithObservableWithInit } from '../tools';
import { IChangeAppModeElementViewModel, Models } from '../types';

//TODO: tests
export const useChangeAppModeElementViewModel = () => {
    const viewModel = getModelByKey<IChangeAppModeElementViewModel>(Models.CHANGE_APP_MODE_ELEMENT_VIEW_MODEL);
    const translations = useStateWithObservableWithInit(viewModel.translations$, DEFAULTS.TRANSLATIONS);
    const isFreeHandMode = useStateWithObservableWithInit(viewModel.isFreeHandMode$, DEFAULTS.FREE_HAND_MODE);
    const theme = useStateWithObservableWithInit(viewModel.theme$, DEFAULTS.THEME);

    const changeAppMode = async () => {
        viewModel.toggleIsFreeHandMode();
    };

    return {
        changeAppMode,
        translations,
        isFreeHandMode,
        theme,
    };
};
