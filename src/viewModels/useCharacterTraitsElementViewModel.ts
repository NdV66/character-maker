import { BehaviorSubject } from 'rxjs';
import { useMemo } from 'react';
import { getModelByKey, useAppContext } from '../context';
import { DEFAULTS } from '../defaults';
import { useStateWithObservableWithInit } from '../tools';
import { ICharacterTraitsManager } from '../types/interfaces/ICharacterTraitsManager';
import { Models } from '../types';

export const useCharacterTraitsElementViewModel = () => {
    const { theme, translations } = useAppContext();
    const pairsManager = getModelByKey<ICharacterTraitsManager>(Models.CHARACTER_TRAITS_MANAGER);

    const _currentValueSource = useMemo(() => new BehaviorSubject<number>(DEFAULTS.PERCENT), []);

    const currentValue = useStateWithObservableWithInit(_currentValueSource, DEFAULTS.PERCENT);

    const onChangeCharacterTrait = (value: number) => {
        _currentValueSource.next(value);
    };

    return {
        theme,
        translations,
        onChangeCharacterTrait,
        currentValue,
        characterTraitsPairs: pairsManager.characterTraitsPairs,
    };
};
