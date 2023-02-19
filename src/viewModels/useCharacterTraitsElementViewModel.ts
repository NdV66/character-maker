import { BehaviorSubject } from 'rxjs';
import { useMemo } from 'react';
import { useAppContext } from '../context';
import { DEFAULTS } from '../defaults';
import { useStateWithObservableWithInit } from '../tools';

export const useCharacterTraitsElementViewModel = () => {
    const { theme } = useAppContext();
    const _currentValueSource = useMemo(() => new BehaviorSubject<number>(DEFAULTS.PERCENT), []);
    const currentValue = useStateWithObservableWithInit(_currentValueSource, DEFAULTS.PERCENT);

    const onChangeCharacterTrait = (value: number) => {
        _currentValueSource.next(value);
    };

    return {
        theme,
        onChangeCharacterTrait,
        currentValue,
    };
};
