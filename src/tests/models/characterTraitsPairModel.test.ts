import { DEFAULTS } from '../../defaults';
import { CharacterTraitsPairModel } from '../../models/CharacterTraitsPairModel';
import { characterTraitModelMock } from '../mocks';

const ID = '1';
const characterTrait = characterTraitModelMock('1', 'key1', 20);
const oppositeCharacterTrait = characterTraitModelMock('2', 'key2', 80);

describe('CharacterTraitsPairModel', () => {
    let model: CharacterTraitsPairModel;

    beforeEach(() => {
        model = new CharacterTraitsPairModel(ID, characterTrait, oppositeCharacterTrait);
    });

    test('Should be created correctly', () => {
        expect(model.id).toBe(ID);
        expect(model.mainCharacterTrait).toEqual(characterTrait);
        expect(model.oppositeCharacterTrait).toEqual(oppositeCharacterTrait);
    });

    test('Should reset values for main and opposite character traits', () => {
        model.reset();

        expect(characterTrait.reset).toHaveBeenCalledTimes(1);
        expect(oppositeCharacterTrait.reset).toHaveBeenCalledTimes(1);
    });

    test('Should set setPercentForMainCharacterTrait (correct value)', () => {
        const value = 40;
        const oppositeValue = DEFAULTS.MAX_PERCENT - value;
        model.setPercentForMainCharacterTrait(value);

        expect(characterTrait.percent).toBe(value);
        expect(oppositeCharacterTrait.percent).toBe(oppositeValue);
    });
});

export {};
