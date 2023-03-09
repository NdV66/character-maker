/* Main Manager for handle and update all character traits */

import { NOT_FOUND_ERROR } from '../../defaults';
import {
    ICharacterTraitsPair,
    ICharacterTraitsManager,
    TCharacterTraitImpact,
    TCharacterTraitImpactLight,
} from '../../types';

export class CharacterTraitsManagerModel implements ICharacterTraitsManager {
    private _characterTraitsPairs: Map<ICharacterTraitsPair['id'], ICharacterTraitsPair>;

    constructor(
        private readonly _characterTraitImpacts: TCharacterTraitImpact[],
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

    private _getImpactById(id: string) {
        return this._characterTraitImpacts.find((el) => el.pairId === id)?.impacts;
    }

    private _getMainPairById(pairId: string) {
        const mainPair = this._characterTraitsPairs.get(pairId);
        if (!mainPair) {
            throw NOT_FOUND_ERROR;
        }
        return mainPair;
    }

    private _setImpact(mainPairPercent: number, { affectedId, impact }: TCharacterTraitImpactLight) {
        const currentAffectedPair = this._characterTraitsPairs.get(affectedId)!;
        const currentPercentRaw = mainPairPercent * impact;
        const currentPercent = Math.floor(currentPercentRaw);
        currentAffectedPair.setPercentForMainCharacterTrait(currentPercent);
    }

    private _setImpacts(mainPair: ICharacterTraitsPair, impacts: TCharacterTraitImpactLight[]) {
        for (const impact of impacts) {
            this._setImpact(mainPair.mainCharacterTrait.percent, impact);
        }
    }

    public updatePairPercentById(pairId: string, percent: number) {
        const mainPair = this._getMainPairById(pairId);
        const impacts = this._getImpactById(pairId);

        mainPair.setPercentForMainCharacterTrait(percent);
        impacts && this._setImpacts(mainPair, impacts);

        return true;
    }

    public resetAll() {
        this._characterTraitsPairs.forEach((value) => value.reset());
    }
}
