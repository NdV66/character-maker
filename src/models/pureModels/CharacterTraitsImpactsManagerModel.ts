import { TCharacterTraitImpact, ICharacterTraitsImpactsManager, TCharacterTraitImpactLight } from '../../types';

export class CharacterTraitsImpactsManagerModel implements ICharacterTraitsImpactsManager {
    constructor(private readonly _characterTraitImpacts: TCharacterTraitImpact[]) {}

    public getImpactByPairId(id: string) {
        const data = this._characterTraitImpacts.find((el) => el.pairId === id);
        return data?.impacts;
    }

    public calcPercent(mainPairPercent: number, impact: TCharacterTraitImpactLight) {
        const currentPercentRaw = mainPairPercent * impact.impact;
        return Math.floor(currentPercentRaw);
    }
}
