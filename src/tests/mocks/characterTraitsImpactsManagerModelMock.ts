import { ICharacterTraitsImpactsManager } from '../../types';

export const characterTraitsImpactsManagerModelMock = () =>
    ({
        calcPercent: jest.fn(),
        getImpactByPairId: jest.fn(),
    } as ICharacterTraitsImpactsManager);
