import { useMemo } from 'react';
import { useAppContext } from '../context';
import { useStateWithObservable } from '../tools';
import { CharacterTraitsElementViewModel } from '../models/viewModels';

export const useCharacterTraitsElementViewModel = () => {
    const { theme, translations } = useAppContext();
    const viewModel = useMemo(() => new CharacterTraitsElementViewModel(), []);
    const dataSource = useStateWithObservable(viewModel.dataSource);

    return {
        theme,
        translations,
        onChangeCharacterTrait: viewModel.updatePairPercentById,
        characterTraitsPairs: viewModel.characterTraitsPairs,
        dataSource,
    };
};
