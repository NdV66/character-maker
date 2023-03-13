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
        const callback = async () => await model.updatePairPercentById('not_existed_id', 60, true);
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

    describe('_updateImpacts', () => {
        beforeEach(() => {
            model['_setImpacts'] = jest.fn();
        });

        test('Should set impact only when they are impacts', () => {
            impactsManagerModel.getImpactByPairId = jest.fn().mockReturnValue(impactsMocks);
            model['_updateImpacts'](mainPair);

            expect(model['_setImpacts']).toHaveBeenCalledTimes(1);
            expect(model['_setImpacts']).toHaveBeenCalledWith(mainPair, impactsMocks);
        });

        test('Should not set impact when they are no impacts (undefined)', () => {
            impactsManagerModel.getImpactByPairId = jest.fn().mockReturnValue(undefined);
            model['_updateImpacts'](mainPair);
            expect(model['_setImpacts']).not.toHaveBeenCalled();
        });

        test('Should not set impact when they are no impacts (empty array)', () => {
            impactsManagerModel.getImpactByPairId = jest.fn().mockReturnValue([]);
            model['_updateImpacts'](mainPair);
            expect(model['_setImpacts']).not.toHaveBeenCalled();
        });
    });

    describe('updatePairPercentById', () => {
        const value = 60;

        beforeEach(() => {
            model['_setImpacts'] = jest.fn();
            model['_updateImpacts'] = jest.fn();
        });

        test('- free hand mode', async () => {
            await model.updatePairPercentById(mainPair.id, value, true);

            expect(mainPair.setPercentForMainCharacterTrait).toHaveBeenCalledTimes(1);
            expect(mainPair.setPercentForMainCharacterTrait).toHaveBeenCalledWith(value);
            expect(model['_setImpacts']).not.toHaveBeenCalled();
            expect(model['_updateImpacts']).not.toHaveBeenCalled();
        });

        test('- no free hand mode', async () => {
            await model.updatePairPercentById(mainPair.id, value, false);

            expect(mainPair.setPercentForMainCharacterTrait).toHaveBeenCalledTimes(1);
            expect(mainPair.setPercentForMainCharacterTrait).toHaveBeenCalledWith(value);
            expect(model['_setImpacts']).not.toHaveBeenCalled();
            expect(model['_updateImpacts']).toHaveBeenCalledTimes(1);
        });
    });
});

export {};
