import { IAppContextViewModel, ICharacterTraitsManager, IExporter, TCharacterTraitPairLight } from '../../../types';
import { characterTraitsManagerMock, TRAIT_PAIRS, TRAIT_PAIR, appContextViewModelMock } from '../../mocks';
import { TestScheduler } from 'rxjs/testing';
import { CharacterTraitsElementViewModel } from '../../../models';
import { imageExporterMock } from '../../mocks/exporterMock';

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
    let imageExporter: IExporter;
    let model: CharacterTraitsElementViewModel;

    beforeEach(() => {
        traitsManagerMock = characterTraitsManagerMock(TRAIT_PAIRS) as any as ICharacterTraitsManager;
        imageExporter = imageExporterMock();
        appContextMock = appContextViewModelMock() as any as IAppContextViewModel;
        model = new CharacterTraitsElementViewModel(appContextMock, traitsManagerMock, imageExporter);

        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });
    });

    test('Should return correct data$ on enter', () => {
        testScheduler.run(({ expectObservable }) => {
            expectObservable(model.data$).toBe('a', { a: PREPARED_DATA });
        });
    });

    // test('Should return correct translations$ on enter', () => {
    //     testScheduler.run(({ expectObservable }) => {
    //         expectObservable(model.translations$).toBe('a', { a:  });
    //     });
    // });

    test('Should return correct characterTraitsPairs', () => {
        expect(model.characterTraitsPairs).toEqual(TRAIT_PAIRS);
    });

    test('Should prepare correct data format for data$', () => {
        const result = model['_prepareDataForDataSource'](TRAIT_PAIRS);
        expect(result).toEqual(PREPARED_DATA);
    });

    test('Should _prepareCharacterTraitPairValue', () => {
        const result = model['_prepareCharacterTraitPairValue'](TRAIT_PAIR);
        expect(result).toEqual(PREPARED_DATA);
    });

    //TODO
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

    //     });
    // });
});

export {};
