import { NOT_FOUND_ERROR } from '../../../defaults';
import { GenericSingletonManager } from '../../../models';

class TestModel {
    public one = true;
}
const testModel = new TestModel();
const MODELS = { testModel };

describe('GenericSingletonManager', () => {
    let model: GenericSingletonManager;

    beforeEach(() => {
        model = new GenericSingletonManager(MODELS);
    });

    test('Should get element by key and as requested type', () => {
        const result = model.getSingleton<TestModel>('testModel');

        expect(result).toEqual(testModel);
        expect(result instanceof TestModel).toBe(true);
    });

    test('Should the NOT_FOUND_ERROR if there is no element by key', () => {
        const callback = () => model.getSingleton('not_existed_element');
        expect(callback).toThrow(NOT_FOUND_ERROR);
    });
});

export {};
