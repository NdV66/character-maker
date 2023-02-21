import { getModelByKey, useAppContext } from '../context';
import { useStateWithObservable } from '../tools';
import { ICharacterTraitsElementViewModel, Models } from '../types';

export const useCharacterTraitsElementViewModel = () => {
    const { theme, translations } = useAppContext();
    const viewModel = getModelByKey<ICharacterTraitsElementViewModel>(Models.CHARACTER_TRAITS_ELEMENT_VIEW_MODEL);
    const dataSource = useStateWithObservable(viewModel.data$);

    return {
        theme,
        translations,
        onChangeCharacterTrait: viewModel.updatePairPercentById,
        characterTraitsPairs: viewModel.characterTraitsPairs,
        dataSource,
    };
};
