import { NOT_FOUND_ERROR } from '../../../defaults';
import { CharacterTraitsManagerModel } from '../../../models';
import { TCharacterTraitImpact, CharacterTraitsPairsIds } from '../../../types';
import { characterTraitModelMock, characterTraitsPairModelMock } from '../../mocks';

const characterTrait = characterTraitModelMock('1', 'key1', 20);
const oppositeCharacterTrait = characterTraitModelMock('2', 'key2', 80);
const mainPair = characterTraitsPairModelMock('mainPairId', characterTrait, oppositeCharacterTrait);

const characterTrait_impact = characterTraitModelMock('1', 'key11', 60);
const oppositeCharacterTrait_impact = characterTraitModelMock('2', 'key22', 40);
const impactPair = characterTraitsPairModelMock('affectedPairId', characterTrait_impact, oppositeCharacterTrait_impact);

const traitPairs = [mainPair, impactPair];

const impactMock = {
    pairId: mainPair.id as CharacterTraitsPairsIds,
    impacts: [
        {
            affectedId: impactPair.id as CharacterTraitsPairsIds,
            impact: 0.5,
        },
    ],
};
const impactsMocks: TCharacterTraitImpact[] = [impactMock];

describe('CharacterTraitsManagerModel', () => {
    let model: CharacterTraitsManagerModel;

    beforeEach(() => {
        model = new CharacterTraitsManagerModel(impactsMocks, traitPairs);
    });

    test('Should prepare character traits map from enters', () => {
        const expectedResult = new Map([
            [mainPair.id, mainPair],
            [impactPair.id, impactPair],
        ]);
        const result = model['_prepareCharacterTraitsPairs'](traitPairs);
        expect(result).toEqual(expectedResult);
    });

    test('Should reset all', () => {
        model.resetAll();
        expect(mainPair.reset).toHaveBeenCalledTimes(1);
    });

    test("Should throw NOT_FOUND_ERROR, if trait pair with given id doesn't exist", () => {
        const callback = () => model.updatePairPercentById('not_existed_id', 60);
        expect(callback).toThrow(NOT_FOUND_ERROR);
    });

    test('Should get impacts by main pair id (_getImpactById)', () => {
        const result = model['_getImpactById'](mainPair.id);
        expect(result).toEqual(impactMock.impacts);
    });

    test('Should return undefined, when there is no impact (_getImpactById)', () => {
        const result = model['_getImpactById']('wrong_id');
        expect(result).toBeUndefined();
    });

    test('Should set impact (_setImpact)', () => {
        const expectedValue = mainPair.mainCharacterTrait.percent * impactMock.impacts[0].impact;
        model['_setImpact'](mainPair.mainCharacterTrait.percent, impactMock.impacts[0]);

        expect(impactPair.setPercentForMainCharacterTrait).toHaveBeenCalledTimes(1);
        expect(impactPair.setPercentForMainCharacterTrait).toHaveBeenCalledWith(expectedValue);
    });

    test('Should set impact for every impact object (_setImpacts)', () => {
        model['_setImpact'] = jest.fn();
        model['_setImpacts'](mainPair, impactMock.impacts);

        expect(model['_setImpact']).toHaveBeenCalledTimes(impactsMocks.length);
    });

    test('Should update percent for selected main pair (by id) (no impacts)', () => {
        const value = 60;
        const model = new CharacterTraitsManagerModel([], traitPairs);

        model.updatePairPercentById(mainPair.id, value);

        expect(mainPair.setPercentForMainCharacterTrait).toHaveBeenCalledTimes(1);
        expect(mainPair.setPercentForMainCharacterTrait).toHaveBeenCalledWith(value);
    });

    test('Should update percent for selected main pair (by id) (with impacts)', () => {
        const value = 60;
        model['_setImpacts'] = jest.fn();

        model.updatePairPercentById(mainPair.id, value);

        expect(mainPair.setPercentForMainCharacterTrait).toHaveBeenCalledTimes(1);
        expect(mainPair.setPercentForMainCharacterTrait).toHaveBeenCalledWith(value);
        expect(model['_setImpacts']).toHaveBeenCalledTimes(impactsMocks.length);
        expect(model['_setImpacts']).toHaveBeenCalledWith(mainPair, impactMock.impacts);
    });
});

export {};
