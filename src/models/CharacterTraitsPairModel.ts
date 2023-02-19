import { DEFAULTS } from '../defaults';
import { ICharacterTrait, ICharacterTraitsPair } from '../types';

export class CharacterTraitsPairModel implements ICharacterTraitsPair {
    constructor(
        public readonly id: string,
        public readonly mainCharacterTrait: ICharacterTrait,
        public readonly oppositeCharacterTrait: ICharacterTrait,
    ) {}

    get percent() {
        return this.mainCharacterTrait.percent;
    }

    public reset() {
        this.mainCharacterTrait.reset();
        this.oppositeCharacterTrait.reset();
    }

    public setPercentForMainCharacterTrait(percent: number) {
        this.mainCharacterTrait.percent = percent;
        this.oppositeCharacterTrait.percent = DEFAULTS.MAX_PERCENT - percent;
    }
}
