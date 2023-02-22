import { IAppContextViewModel, ICharacterTraitsManager } from '../../types';
import { characterTraitsManagerMock, TRAIT_PAIRS, TRAIT_PAIR, appContextViewModelMock } from '../mocks';
import { TestScheduler } from 'rxjs/testing';
import { CharacterTraitsElementViewModel } from '../../models';

describe('CharacterTraitsElementViewModel', () => {
    let traitsManagerMock: ICharacterTraitsManager;
    let appContextMock: IAppContextViewModel;
    let testScheduler: TestScheduler;

    beforeEach(() => {
        traitsManagerMock = characterTraitsManagerMock(TRAIT_PAIRS) as any as ICharacterTraitsManager;
        appContextMock = appContextViewModelMock() as any as IAppContextViewModel;

        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });
    });

    test('Should return correct data$', () => {
        const expectedValue = { [TRAIT_PAIR.id]: TRAIT_PAIR.mainPercent };
        testScheduler.run(({ expectObservable }) => {
            const model = new CharacterTraitsElementViewModel(appContextMock, traitsManagerMock);
            expectObservable(model.data$).toBe('a', { a: expectedValue });
        });
    });

    test('Should return correct characterTraitsPairs', () => {
        const model = new CharacterTraitsElementViewModel(appContextMock, traitsManagerMock);
        expect(model.characterTraitsPairs).toEqual(TRAIT_PAIRS);
    });

    test('Should prepare correct data format for data$', () => {
        const expectedValue = { [TRAIT_PAIR.id]: TRAIT_PAIR.mainPercent };
        const model = new CharacterTraitsElementViewModel(appContextMock, traitsManagerMock);
        const result = model['_prepareDataForDataSource'](TRAIT_PAIRS);
        expect(result).toEqual(expectedValue);
    });

    test('Should update pair by this pair id', () => {
        const value = 60;
        const firstValue = { [TRAIT_PAIR.id]: TRAIT_PAIR.mainPercent };
        const updatedValue = { [TRAIT_PAIR.id]: value };
        traitsManagerMock.updatePairPercentById = jest.fn().mockReturnValue(true);

        testScheduler.run(({ cold, expectObservable }) => {
            const model = new CharacterTraitsElementViewModel(appContextMock, traitsManagerMock);
            model['_prepareDataForDataSourceFull'] = jest.fn().mockReturnValue(updatedValue);
            cold('-a').subscribe(() => model.updatePairPercentById(TRAIT_PAIR.id, value));

            expectObservable(model.data$).toBe('ab', { a: firstValue, b: updatedValue });
        });
    });
});

export {};
