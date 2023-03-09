/* Main Manager for handle and update all character traits */

import { NOT_FOUND_ERROR } from '../../defaults';
import {
    ICharacterTraitsPair,
    ICharacterTraitsManager,
    ICharacterTraitsImpactsManager,
    TCharacterTraitImpactLight,
} from '../../types';

export class CharacterTraitsManagerModel implements ICharacterTraitsManager {
    private _characterTraitsPairs: Map<ICharacterTraitsPair['id'], ICharacterTraitsPair>;

    constructor(
        private readonly _impactsManager: ICharacterTraitsImpactsManager,
        characterTraitsPairs: ICharacterTraitsPair[],
    ) {
        this._characterTraitsPairs = this._prepareCharacterTraitsPairs(characterTraitsPairs);
    }

    get characterTraitsPairs() {
        const values = this._characterTraitsPairs.values();
        return Array.from(values);
    }

    private _prepareCharacterTraitsPairs(characterTraitsPairs: ICharacterTraitsPair[]) {
        const result: Map<ICharacterTraitsPair['id'], ICharacterTraitsPair> = new Map([]);
        characterTraitsPairs.forEach((value) => result.set(value.id, value));
        return result;
    }

    private _getMainPairById(pairId: string) {
        const mainPair = this._characterTraitsPairs.get(pairId);
        if (!mainPair) {
            throw NOT_FOUND_ERROR;
        }
        return mainPair;
    }

    private _setImpact(mainPairPercent: number, affectedPair: TCharacterTraitImpactLight) {
        const currentAffectedPair = this._characterTraitsPairs.get(affectedPair.affectedId)!;
        const currentPercent = this._impactsManager.calcPercent(mainPairPercent, affectedPair);
        currentAffectedPair.setPercentForMainCharacterTrait(currentPercent);
    }

    private _setImpacts(mainPair: ICharacterTraitsPair, impacts: TCharacterTraitImpactLight[]) {
        for (const impact of impacts) {
            this._setImpact(mainPair.mainCharacterTrait.percent, impact);
        }
    }

    public updatePairPercentById(pairId: string, percent: number) {
        const mainPair = this._getMainPairById(pairId);
        const impacts = this._impactsManager.getImpactByPairId(pairId);

        mainPair.setPercentForMainCharacterTrait(percent);
        impacts && this._setImpacts(mainPair, impacts);

        return true;
    }

    public resetAll() {
        this._characterTraitsPairs.forEach((value) => value.reset());
    }
}
