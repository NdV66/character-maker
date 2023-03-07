import { BehaviorSubject } from 'rxjs';

import {
    ICharacterTraitsPair,
    ICharacterTraitsManager,
    TCharacterTraitPairLight,
    ICharacterTraitsElementViewModel,
    IAppContextViewModel,
    IExporter,
} from '../../types';

export class CharacterTraitsElementViewModel implements ICharacterTraitsElementViewModel {
    private _data$ = new BehaviorSubject<TCharacterTraitPairLight>({});
    private _isExporting$ = new BehaviorSubject<boolean>(false);

    constructor(
        private _appContext: IAppContextViewModel,
        private _pairsManager: ICharacterTraitsManager,
        private _imageExporter: IExporter,
    ) {
        this._refreshData();
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

    get isExporting$() {
        return this._isExporting$.asObservable();
    }

    get characterTraitsPairs() {
        return this._pairsManager.characterTraitsPairs;
    }

    private _prepareDataForDataSource(characterTraitsPairs: ICharacterTraitsPair[]) {
        return characterTraitsPairs.reduce(
            (prev, el) => ({
                ...prev,
                ...this._prepareCharacterTraitPairValue(el),
            }),
            {},
        );
    }

    private _prepareCharacterTraitPairValue(el: ICharacterTraitsPair): TCharacterTraitPairLight {
        return {
            [el.id]: {
                mainPercent: el.mainCharacterTrait.percent,
                oppositePercent: el.oppositeCharacterTrait.percent,
            },
        };
    }

    private _refreshData() {
        const data = this._prepareDataForDataSource(this._pairsManager.characterTraitsPairs);
        this._data$.next(data);
    }

    private _updateIsExporting() {
        const value = this._imageExporter.isExporting;
        this._isExporting$.next(value);
    }

    public updatePairPercentById = (id: string, value: number) => {
        this._pairsManager.updatePairPercentById(id, value);
        this._refreshData();
    };

    public resetAll = () => {
        this._pairsManager.resetAll();
        this._refreshData();
    };

    public exportToImage = async <T extends HTMLElement>(element: T) => {
        this._updateIsExporting();
        await this._imageExporter.export(element);
        this._updateIsExporting();
    };
}
