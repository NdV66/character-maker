import { ICharacterTraitsManager } from '../../types';
import { characterTraitsManagerMock, TRAIT_PAIRS, TRAIT_PAIR } from '../mocks';
import * as modelsTools from '../../context/models';
import { TestScheduler } from 'rxjs/testing';
import { CharacterTraitsElementViewModel } from '../../models';

describe('CharacterTraitsElementViewModel', () => {
    let traitsManagerMock: ICharacterTraitsManager;
    let testScheduler: TestScheduler;

    beforeEach(() => {
        traitsManagerMock = characterTraitsManagerMock(TRAIT_PAIRS) as any as ICharacterTraitsManager;
        jest.spyOn(modelsTools, 'getModelByKey').mockReturnValue(traitsManagerMock);
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });
    });

    test('Should return correct dataSource', () => {
        const expectedValue = { [TRAIT_PAIR.id]: TRAIT_PAIR.percent };
        testScheduler.run(({ expectObservable }) => {
            const model = new CharacterTraitsElementViewModel();
            expectObservable(model.dataSource).toBe('a', { a: expectedValue });
        });
    });

    test('Should return correct characterTraitsPairs', () => {
        const model = new CharacterTraitsElementViewModel();
        expect(model.characterTraitsPairs).toEqual(TRAIT_PAIRS);
    });

    test('Should prepare correct data format for dataSource', () => {
        const expectedValue = { [TRAIT_PAIR.id]: TRAIT_PAIR.percent };
        const model = new CharacterTraitsElementViewModel();
        const result = model['_prepareDataForDataSource'](TRAIT_PAIRS);
        expect(result).toEqual(expectedValue);
    });

    test.only('Should update pair by this pair id', () => {
        const value = 60;
        const firstValue = { [TRAIT_PAIR.id]: TRAIT_PAIR.percent };
        const updatedValue = { [TRAIT_PAIR.id]: value };
        traitsManagerMock.updatePairPercentById = jest.fn().mockReturnValue(true);

        testScheduler.run(({ cold, expectObservable }) => {
            const model = new CharacterTraitsElementViewModel();
            model['_prepareDataForDataSourceFull'] = jest.fn().mockReturnValue(updatedValue);
            cold('-a').subscribe(() => model.updatePairPercentById(TRAIT_PAIR.id, value));

            expectObservable(model.dataSource).toBe('ab', { a: firstValue, b: updatedValue });
        });
    });
});

export {};
