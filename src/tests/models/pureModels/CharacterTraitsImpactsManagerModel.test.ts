import { CharacterTraitsImpactsManagerModel } from '../../../models';
import { mainPair, impactsMocks, impactMock } from '../../mocks';

describe('CharacterTraitsImpactsManagerModel', () => {
    let model: CharacterTraitsImpactsManagerModel;

    beforeEach(() => {
        model = new CharacterTraitsImpactsManagerModel(impactsMocks);
    });

    test('Should get impacts by main pair id (getImpactByPairId)', () => {
        const result = model.getImpactByPairId(mainPair.id);
        expect(result).toEqual(impactMock.impacts);
    });

    test('Should return undefined, when there is no impact (getImpactByPairId)', () => {
        const result = model.getImpactByPairId('wrong_id');
        expect(result).toBeUndefined();
    });

    test('Should calc percent', () => {
        const mainPairPercent = 20;
        const impact = impactMock.impacts[0];
        const expectedValue = mainPairPercent * impact.impact;

        const result = model.calcPercent(mainPairPercent, impact);

        expect(result).toBe(expectedValue);
    });
});

export {};
