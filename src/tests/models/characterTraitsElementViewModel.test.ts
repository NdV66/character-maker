import { IAppContextViewModel, ICharacterTraitsManager, TCharacterTraitPairLight } from '../../types';
import { characterTraitsManagerMock, TRAIT_PAIRS, TRAIT_PAIR, appContextViewModelMock } from '../mocks';
import { TestScheduler } from 'rxjs/testing';
import { CharacterTraitsElementViewModel } from '../../models';

const PREPARED_DATA: TCharacterTraitPairLight = {
    [TRAIT_PAIR.id]: {
        mainPercent: TRAIT_PAIR.mainCharacterTrait.percent,
        oppositePercent: TRAIT_PAIR.oppositeCharacterTrait.percent,
    },
};

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
        testScheduler.run(({ expectObservable }) => {
            const model = new CharacterTraitsElementViewModel(appContextMock, traitsManagerMock);
            expectObservable(model.data$).toBe('a', { a: PREPARED_DATA });
        });
    });

    test('Should return correct characterTraitsPairs', () => {
        const model = new CharacterTraitsElementViewModel(appContextMock, traitsManagerMock);
        expect(model.characterTraitsPairs).toEqual(TRAIT_PAIRS);
    });

    test('Should prepare correct data format for data$', () => {
        const model = new CharacterTraitsElementViewModel(appContextMock, traitsManagerMock);
        const result = model['_prepareDataForDataSource'](TRAIT_PAIRS);
        expect(result).toEqual(PREPARED_DATA);
    });

    test('Should _prepareCharacterTraitPairValue', () => {
        const model = new CharacterTraitsElementViewModel(appContextMock, traitsManagerMock);
        const result = model['_prepareCharacterTraitPairValue'](TRAIT_PAIR);
        expect(result).toEqual(PREPARED_DATA);
    });

    // test('Should update pair by this pair id', () => {
    //     const value = 60;
    //     const firstValue = PREPARED_DATA;
    //     const updatedValue: TCharacterTraitPairLight = {
    //         [TRAIT_PAIR.id]: {
    //             mainPercent: TRAIT_PAIR.mainCharacterTrait.percent,
    //             oppositePercent: TRAIT_PAIR.oppositeCharacterTrait.percent,
    //         },
    //     };
    //     traitsManagerMock.updatePairPercentById = jest.fn().mockReturnValue(true);

    //     testScheduler.run(({ cold, expectObservable }) => {
    //         const model = new CharacterTraitsElementViewModel(appContextMock, traitsManagerMock);
    //         model['_prepareDataForDataSourceFull'] = jest.fn().mockReturnValue(updatedValue);
    //         cold('-a').subscribe(() => model.updatePairPercentById(TRAIT_PAIR.id, value));

    //         expectObservable(model.data$).toBe('ab', { a: firstValue, b: updatedValue });
    //     });
    // });
});

export {};
