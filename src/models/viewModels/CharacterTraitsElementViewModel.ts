import { BehaviorSubject } from 'rxjs';
import { getModelByKey } from '../../context';
import {
    Models,
    ICharacterTraitsPair,
    ICharacterTraitsManager,
    TCharacterTraitValue,
    ICharacterTraitsElementViewModel,
} from '../../types';

export class CharacterTraitsElementViewModel implements ICharacterTraitsElementViewModel {
    private _pairsManager = getModelByKey<ICharacterTraitsManager>(Models.CHARACTER_TRAITS_MANAGER);
    private _data$ = new BehaviorSubject<TCharacterTraitValue>({});

    constructor() {
        this._data$.next(this._prepareDataForDataSourceFull());
    }

    get data$() {
        return this._data$.asObservable();
    }

    get characterTraitsPairs() {
        return this._pairsManager.characterTraitsPairs;
    }

    private _prepareDataForDataSource(characterTraitsPairs: ICharacterTraitsPair[]) {
        return characterTraitsPairs.reduce((prev, el) => ({ ...prev, [el.id]: el.mainCharacterTrait.percent }), {});
    }

    private _prepareDataForDataSourceFull() {
        return this._prepareDataForDataSource(this._pairsManager.characterTraitsPairs);
    }

    public updatePairPercentById = (id: string, value: number) => {
        const result = this._pairsManager.updatePairPercentById(id, value);
        result && this._data$.next(this._prepareDataForDataSourceFull());
    };
}
