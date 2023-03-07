import { IAppContextViewModel, ICharacterTraitsManager, IExporter, TCharacterTraitPairLight } from '../../../types';
import { characterTraitsManagerMock, TRAIT_PAIRS, TRAIT_PAIR, appContextViewModelMock } from '../../mocks';
import { TestScheduler } from 'rxjs/testing';
import { CharacterTraitsElementViewModel } from '../../../models';
import { imageExporterMock } from '../../mocks/exporterMock';
import { Observable } from 'rxjs';
import { TEXTS_EN } from '../../../langs/en';
import { DARK_THEME } from '../../../styles';

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

    test('Should return correct translations$ on enter', () => {
        testScheduler.run(({ expectObservable }) => {
            const translations = TEXTS_EN;
            appContextMock.translations$ = new Observable((observer) => observer.next(translations));
            expectObservable(model.translations$).toBe('a', { a: translations });
        });
    });

    test('Should return correct theme$ on enter', () => {
        testScheduler.run(({ expectObservable }) => {
            const theme = DARK_THEME;
            appContextMock.theme$ = new Observable((observer) => observer.next(theme));
            expectObservable(model.theme$).toBe('a', { a: theme });
        });
    });

    test('Should return correct characterTraitsPairs', () => {
        expect(model.characterTraitsPairs).toEqual(TRAIT_PAIRS);
    });

    test('Should prepare correct data format for data$', () => {
        const result = model['_prepareDataForDataSource'](TRAIT_PAIRS);
        expect(result).toEqual(PREPARED_DATA);
    });

    test('Should _prepareCharacterTraitPairValue()', () => {
        const result = model['_prepareCharacterTraitPairValue'](TRAIT_PAIR);
        expect(result).toEqual(PREPARED_DATA);
    });

    test('Should refresh data', () => {
        model['_prepareDataForDataSource'] = jest.fn().mockReturnValueOnce(PREPARED_DATA);

        testScheduler.run(({ cold, expectObservable }) => {
            cold('a').subscribe(() => model['_refreshData']());
            expectObservable(model['_data$']).toBe('a', { a: PREPARED_DATA });
        });
    });

    test('Should update by pair id', () => {
        const id = '1';
        const value = 66;
        model['_refreshData'] = jest.fn();

        model.updatePairPercentById(id, value);

        expect(model['_refreshData']).toHaveBeenCalledTimes(1);
        expect(traitsManagerMock.updatePairPercentById).toHaveBeenCalledTimes(1);
        expect(traitsManagerMock.updatePairPercentById).toHaveBeenCalledWith(id, value);
    });

    test('Should reset all', () => {
        model['_refreshData'] = jest.fn();
        model.resetAll();

        expect(model['_refreshData']).toHaveBeenCalledTimes(1);
        expect(traitsManagerMock.resetAll).toHaveBeenCalledTimes(1);
    });

    test('Should update isExporting (_updateIsExporting)', () => {
        imageExporter.isExporting = true;

        testScheduler.run(({ cold, expectObservable }) => {
            cold('a').subscribe(() => model['_updateIsExporting']());
            expectObservable(model['_isExporting$']).toBe('a', { a: true });
        });
    });

    test('Should export to image (exportToImage)', () => {
        const element = {} as any;
        model['_updateIsExporting'] = jest.fn();

        model.exportToImage(element);

        expect(imageExporter.export).toHaveBeenCalledWith(element);
        expect(model['_updateIsExporting']).toHaveBeenCalled();
    });
});

export {};
