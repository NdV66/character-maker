import { BehaviorSubject } from 'rxjs';
import { useMemo } from 'react';
import { getModelByKey, useAppContext } from '../context';
import { useStateWithObservable } from '../tools';
import { ICharacterTraitsManager } from '../types/interfaces/ICharacterTraitsManager';
import { Models } from '../types';
import { ICharacterTraitsPair } from '../types/interfaces';

type TCharacterTraitValue = {
    [id: string]: number;
};

const _prepareDataForDataSource = (characterTraitsPairs: ICharacterTraitsPair[]) =>
    characterTraitsPairs.reduce((prev, el) => ({ ...prev, [el.id]: el.mainCharacterTrait.percent }), {});

export const useCharacterTraitsElementViewModel = () => {
    const { theme, translations } = useAppContext();
    const pairsManager = getModelByKey<ICharacterTraitsManager>(Models.CHARACTER_TRAITS_MANAGER);
    const _prepareDataForDataSourceFull = () => _prepareDataForDataSource(pairsManager.characterTraitsPairs);

    const _dataSource = useMemo(() => new BehaviorSubject<TCharacterTraitValue>(_prepareDataForDataSourceFull()), []);
    const dataSource = useStateWithObservable(_dataSource);

    const onChangeCharacterTrait = (id: string, value: number) => {
        pairsManager.updatePairPercentById(id, value);
        _dataSource.next(_prepareDataForDataSourceFull());
    };

    return {
        theme,
        translations,
        onChangeCharacterTrait,
        characterTraitsPairs: pairsManager.characterTraitsPairs,
        dataSource,
    };
};
