import { BehaviorSubject } from 'rxjs';
import { getModelByKey } from '../../context';
import { Models, ICharacterTraitsPair, ICharacterTraitsManager } from '../../types';

type TCharacterTraitValue = {
    [id: string]: number;
};

export class CharacterTraitsElementViewModel {
    private _pairsManager = getModelByKey<ICharacterTraitsManager>(Models.CHARACTER_TRAITS_MANAGER);
    private _dataSource = new BehaviorSubject<TCharacterTraitValue>({});

    constructor() {
        this._dataSource.next(this._prepareDataForDataSourceFull());
    }

    get dataSource() {
        return this._dataSource.asObservable();
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
        result && this._dataSource.next(this._prepareDataForDataSourceFull());
    };
}
