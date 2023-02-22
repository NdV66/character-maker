import { BehaviorSubject } from 'rxjs';

import {
    ICharacterTraitsPair,
    ICharacterTraitsManager,
    TCharacterTraitPairValue,
    ICharacterTraitsElementViewModel,
    IAppContextViewModel,
} from '../../types';

export class CharacterTraitsElementViewModel implements ICharacterTraitsElementViewModel {
    private _data$ = new BehaviorSubject<TCharacterTraitPairValue>({});

    constructor(private _appContext: IAppContextViewModel, private _pairsManager: ICharacterTraitsManager) {
        this._data$.next(this._prepareDataForDataSourceFull());
    }

    get data$() {
        return this._data$.asObservable();
    }

    get translations$() {
        return this._appContext.translations$;
    }

    get theme$() {
        return this._appContext.theme$;
    }

    get characterTraitsPairs() {
        return this._pairsManager.characterTraitsPairs;
    }

    private _prepareDataForDataSource(characterTraitsPairs: ICharacterTraitsPair[]) {
        return characterTraitsPairs.reduce(
            (prev, el) => ({
                ...prev,
                [el.id]: {
                    main: el.mainCharacterTrait,
                    opposite: el.oppositeCharacterTrait,
                },
            }),
            {},
        );
    }

    private _prepareDataForDataSourceFull() {
        return this._prepareDataForDataSource(this._pairsManager.characterTraitsPairs);
    }

    public updatePairPercentById = (id: string, value: number) => {
        const result = this._pairsManager.updatePairPercentById(id, value);
        result && this._data$.next(this._prepareDataForDataSourceFull());
    };
}
