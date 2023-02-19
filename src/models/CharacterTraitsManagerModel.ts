/* Main Manager for handle and update all character traits */

import { NOT_FOUND_ERROR } from '../defaults';
import { ICharacterTraitsPair } from '../types/interfaces';
import { ICharacterTraitsManager } from '../types/interfaces/ICharacterTraitsManager';

export class CharacterTraitsManagerModel implements ICharacterTraitsManager {
    private _characterTraitsPairs: Map<ICharacterTraitsPair['id'], ICharacterTraitsPair>;

    get characterTraitsPairs() {
        const values = this._characterTraitsPairs.values();
        return Array.from(values);
    }

    constructor(characterTraitsPairs: ICharacterTraitsPair[]) {
        this._characterTraitsPairs = this._prepareCharacterTraitsPairs(characterTraitsPairs);
    }

    private _prepareCharacterTraitsPairs(characterTraitsPairs: ICharacterTraitsPair[]) {
        const result: Map<ICharacterTraitsPair['id'], ICharacterTraitsPair> = new Map([]);
        characterTraitsPairs.forEach((value) => result.set(value.id, value));

        return result;
    }

    public resetAll() {
        this._characterTraitsPairs.forEach((value) => value.reset());
    }

    public updatePairPercentById(pairId: string, percent: number) {
        const pair = this._characterTraitsPairs.get(pairId);
        if (!pair) {
            throw NOT_FOUND_ERROR;
        }
        pair.setPercentForMainCharacterTrait(percent);
    }
}
