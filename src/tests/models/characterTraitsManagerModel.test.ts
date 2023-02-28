import { NOT_FOUND_ERROR } from '../../defaults';
import { CharacterTraitsManagerModel } from '../../models';
import { ICharacterTrait } from '../../types';
import { characterTraitModelMock, characterTraitsPairModelMock } from '../mocks';

const ID = 'pair1';
const characterTrait = characterTraitModelMock('1', 'key1', 20) as ICharacterTrait;
const oppositeCharacterTrait = characterTraitModelMock('2', 'key2', 80) as ICharacterTrait;
const pair = characterTraitsPairModelMock(ID, characterTrait, oppositeCharacterTrait);
const traitPairs = [pair];

describe('CharacterTraitsManagerModel', () => {
    let model: CharacterTraitsManagerModel;

    beforeEach(() => {
        model = new CharacterTraitsManagerModel(traitPairs);
    });

    test('Should prepare character traits map from enters', () => {
        const expectedResult = new Map([[pair.id, pair]]);
        const result = model['_prepareCharacterTraitsPairs'](traitPairs);
        expect(result).toEqual(expectedResult);
    });

    test('Should reset all', () => {
        model.resetAll();
        expect(pair.reset).toHaveBeenCalledTimes(1);
    });

    test("Should throw NOT_FOUND_ERROR, if trait pair with given id doesn't exist", () => {
        const callback = () => model.updatePairPercentById('not_existed_id', 60);
        expect(callback).toThrow(NOT_FOUND_ERROR);
    });

    test('Should update percent for selected pair (by id)', () => {
        const value = 60;
        model.updatePairPercentById(ID, value);

        expect(pair.setPercentForMainCharacterTrait).toHaveBeenCalledTimes(1);
        expect(pair.setPercentForMainCharacterTrait).toHaveBeenCalledWith(value);
    });
});

export {};
