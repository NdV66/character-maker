import { BehaviorSubject, distinctUntilChanged, firstValueFrom } from 'rxjs';
import { DEFAULTS } from '../../defaults';

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
    private _isExporting$ = new BehaviorSubject<boolean>(DEFAULTS.EXPORTING);
    private _showTip$ = new BehaviorSubject<boolean>(DEFAULTS.SHOW_TIP);

    constructor(
        private _appContext: IAppContextViewModel,
        private _pairsManager: ICharacterTraitsManager,
        private _imageExporter: IExporter,
    ) {
        this._refreshData();

        this._appContext.isFreeHandMode$.pipe(distinctUntilChanged()).subscribe(() => this._showTip$.next(false));
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

    //TODO: tests
    get showTip$() {
        return this._showTip$;
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

    //TODO: tests
    private _updatePairPercentById = async (id: string, value: number) => {
        const isFreeHandMode = await firstValueFrom(this._appContext.isFreeHandMode$);
        this._pairsManager.updatePairPercentById(id, value, isFreeHandMode);
    };

    //TODO: tests
    public updatePairPercentById = async (id: string, value: number) => {
        this._showTip$.next(false);

        try {
            await this._updatePairPercentById(id, value);
        } catch (error) {
            this._showTip$.next(true);
        } finally {
            this._refreshData();
        }
    };

    public resetAll = () => {
        this._pairsManager.resetAll();
        this._refreshData();

        this._showTip$.next(DEFAULTS.SHOW_TIP);
        this._isExporting$.next(DEFAULTS.EXPORTING);
    };

    public exportToImage = async <T extends HTMLElement>(element: T) => {
        this._updateIsExporting();
        await this._imageExporter.export(element);
        this._updateIsExporting();
    };
}
