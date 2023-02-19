import { ICharacterTrait } from '../../types';
import { characterTraitModelMock } from './characterTraitModelMock';

export const characterTraitsPairModelMock = (
    id = '1',
    mainCharacterTrait?: ICharacterTrait,
    oppositeCharacterTrait?: ICharacterTrait,
) => {
    const main = mainCharacterTrait || characterTraitModelMock('trait1');

    return {
        id,
        mainCharacterTrait: main,
        oppositeCharacterTrait: oppositeCharacterTrait || characterTraitModelMock('trait2'),
        percent: main.percent,

        reset: jest.fn(),
        setPercentForMainCharacterTrait: jest.fn(),
    };
};
