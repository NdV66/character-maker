import { DEFAULTS, OUT_OF_RANGE_ERROR } from '../defaults';
import { ICharacterTrait } from '../types';

export class CharacterTraitModel implements ICharacterTrait {
    private _percent = DEFAULTS.PERCENT;

    constructor(public readonly id: string, public readonly nameTranslationKey: string) {}

    get percent() {
        return this._percent;
    }

    set percent(value: number) {
        if (value >= DEFAULTS.MIN_PERCENT && value <= DEFAULTS.MAX_PERCENT) {
            this._percent = value;
        } else {
            throw OUT_OF_RANGE_ERROR;
        }
    }

    public reset() {
        this._percent = DEFAULTS.PERCENT;
    }
}
