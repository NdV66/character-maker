import { getModelByKey } from '../context';
import { DEFAULTS } from '../defaults';
import { useStateWithObservable, useStateWithObservableWithInit } from '../tools';
import { ICharacterTraitsElementViewModel, Models } from '../types';

export const useCharacterTraitsElementViewModel = () => {
    const viewModel = getModelByKey<ICharacterTraitsElementViewModel>(Models.CHARACTER_TRAITS_ELEMENT_VIEW_MODEL);
    const dataSource = useStateWithObservable(viewModel.data$);
    const theme = useStateWithObservableWithInit(viewModel.theme$, DEFAULTS.THEME);
    const translations = useStateWithObservableWithInit(viewModel.translations$, DEFAULTS.TRANSLATIONS);
    const isExporting = useStateWithObservableWithInit(viewModel.isExporting$, DEFAULTS.EXPORTING);
    const showTip = useStateWithObservableWithInit(viewModel.showTip$, DEFAULTS.SHOW_TIP);

    const exportToImage = (ref: React.RefObject<HTMLDivElement>) => ref.current && viewModel.exportToImage(ref.current);

    return {
        theme,
        translations,
        onChangeCharacterTrait: viewModel.updatePairPercentById,
        characterTraitsPairs: viewModel.characterTraitsPairs,
        dataSource,
        resetAll: viewModel.resetAll,
        exportToImage,
        isExporting,
        showTip,
    };
};
