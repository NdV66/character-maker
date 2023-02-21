import { getModelByKey } from '../context';
import { useStateWithObservable } from '../tools';
import { ICharacterTraitsElementViewModel, Models } from '../types';

export const useCharacterTraitsElementViewModel = () => {
    const viewModel = getModelByKey<ICharacterTraitsElementViewModel>(Models.CHARACTER_TRAITS_ELEMENT_VIEW_MODEL);
    const dataSource = useStateWithObservable(viewModel.data$);
    const theme = useStateWithObservable(viewModel.theme$);
    const translations = useStateWithObservable(viewModel.translations$);

    return {
        theme,
        translations,
        onChangeCharacterTrait: viewModel.updatePairPercentById,
        characterTraitsPairs: viewModel.characterTraitsPairs,
        dataSource,
    };
};
