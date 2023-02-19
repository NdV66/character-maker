import { ICharacterTrait } from '../../types/interfaces';
import { characterTraitModelMock } from './characterTraitModelMock';

export const characterTraitsPairModelMock = (
    id = '1',
    mainCharacterTrait?: ICharacterTrait,
    oppositeCharacterTrait?: ICharacterTrait,
) => ({
    id,
    mainCharacterTrait: mainCharacterTrait || characterTraitModelMock('trait1'),
    oppositeCharacterTrait: oppositeCharacterTrait || characterTraitModelMock('trait2'),

    reset: jest.fn(),
    setPercentForMainCharacterTrait: jest.fn(),
});
