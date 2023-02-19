import { NOT_FOUND_ERROR } from '../../defaults';
import { GenericSingletonManager } from '../../tools';
import { TSingletons } from '../../types';

class TestSingleton {}

const KEY = 'testSingleton';
const SINGLETON_MOCK = new TestSingleton();

const SINGLETONS_MOCK: TSingletons = {
    [KEY]: SINGLETON_MOCK,
};

describe('GenericSingletonManager', () => {
    let manager: GenericSingletonManager;

    beforeEach(() => {
        manager = new GenericSingletonManager(SINGLETONS_MOCK);
    });

    test('Should get singleton by its name', () => {
        const result = manager.getSingleton<TestSingleton>(KEY);
        expect(result).toEqual(SINGLETON_MOCK);
    });

    test('Should get singleton by its name and casted to the given type', () => {
        const result = manager.getSingleton<TestSingleton>(KEY);
        expect(result).toBeInstanceOf(TestSingleton);
    });

    test('Should throw error if there is no singleton with given name', () => {
        const callback = () => manager.getSingleton<TestSingleton>('nothing');
        expect(callback).toThrow(NOT_FOUND_ERROR);
    });
});
