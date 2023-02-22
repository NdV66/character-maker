import { DEFAULTS, OUT_OF_RANGE_ERROR } from '../../defaults';
import { CharacterTraitModel } from '../../models/CharacterTraitModel';

const ID = '1';
const NAME_KEY = '';

describe('CharacterTraitModel', () => {
    let model: CharacterTraitModel;

    beforeEach(() => {
        model = new CharacterTraitModel(ID, NAME_KEY);
    });

    test('Should return default percent', () => {
        expect(model.percent).toBe(DEFAULTS.PERCENT);
    });

    test('Should return default percent', () => {
        expect(model.nameTranslationKey).toBe(NAME_KEY);
    });

    test('Should set percent (correct value)', () => {
        const value = 66;
        model.percent = value;
        expect(model.percent).toBe(value);
    });

    test('Should set percent (correct value, min)', () => {
        model.percent = DEFAULTS.MAX_PERCENT;
        expect(model.percent).toBe(DEFAULTS.MAX_PERCENT);
    });

    test('Should set percent (correct value, max)', () => {
        model.percent = DEFAULTS.MIN_PERCENT;
        expect(model.percent).toBe(DEFAULTS.MIN_PERCENT);
    });

    test('Should throw error, if value is incorrect (less than min)', () => {
        const value = DEFAULTS.MIN_PERCENT - 1;
        const callback = () => (model.percent = value);
        expect(callback).toThrow(OUT_OF_RANGE_ERROR);
    });

    test('Should throw error, if value is incorrect (less than max)', () => {
        const value = DEFAULTS.MAX_PERCENT + 1;
        const callback = () => (model.percent = value);
        expect(callback).toThrow(OUT_OF_RANGE_ERROR);
    });
});

export {};
