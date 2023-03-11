import { NOT_FOUND_ERROR } from '../../../defaults';
import { CharacterTraitsManagerModel } from '../../../models';
import { ICharacterTraitsImpactsManager } from '../../../types';
import {
    characterTraitsImpactsManagerModelMock,
    mainPair,
    impactPair,
    traitPairs,
    impactsMocks,
    impactMock,
} from '../../mocks';

describe('CharacterTraitsManagerModel', () => {
    let impactsManagerModel: ICharacterTraitsImpactsManager;
    let model: CharacterTraitsManagerModel;

    beforeEach(() => {
        impactsManagerModel = characterTraitsImpactsManagerModelMock();
        model = new CharacterTraitsManagerModel(impactsManagerModel, traitPairs);
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
        const callback = async () => await model.updatePairPercentById('not_existed_id', 60);
        expect(callback).rejects.toThrow(NOT_FOUND_ERROR);
    });

    test('Should set impact (_setImpact)', () => {
        const expectedValue = 60;
        impactsManagerModel.calcPercent = jest.fn().mockReturnValue(expectedValue);
        model['_setImpact'](mainPair.mainCharacterTrait.percent, impactMock.impacts[0]);

        expect(impactPair.setPercentForMainCharacterTrait).toHaveBeenCalledTimes(1);
        expect(impactPair.setPercentForMainCharacterTrait).toHaveBeenCalledWith(expectedValue);
    });

    test('Should set impact for every impact object (_setImpacts)', () => {
        model['_setImpact'] = jest.fn();
        model['_setImpacts'](mainPair, impactMock.impacts);

        expect(model['_setImpact']).toHaveBeenCalledTimes(impactsMocks.length);
    });

    test('Should update percent for selected main pair (by id) (no impacts)', async () => {
        const value = 60;
        model['_setImpacts'] = jest.fn();
        await model.updatePairPercentById(mainPair.id, value);

        expect(mainPair.setPercentForMainCharacterTrait).toHaveBeenCalledTimes(1);
        expect(mainPair.setPercentForMainCharacterTrait).toHaveBeenCalledWith(value);
        expect(model['_setImpacts']).not.toHaveBeenCalled();
    });

    test('Should update percent for selected main pair (by id) (with impacts)', async () => {
        const value = 60;
        impactsManagerModel.getImpactByPairId = jest.fn().mockReturnValue(impactMock.impacts);
        model['_setImpacts'] = jest.fn();

        await model.updatePairPercentById(mainPair.id, value);

        expect(mainPair.setPercentForMainCharacterTrait).toHaveBeenCalledTimes(1);
        expect(mainPair.setPercentForMainCharacterTrait).toHaveBeenCalledWith(value);
        expect(model['_setImpacts']).toHaveBeenCalledTimes(impactsMocks.length);
        expect(model['_setImpacts']).toHaveBeenCalledWith(mainPair, impactMock.impacts);
    });
});

export {};
