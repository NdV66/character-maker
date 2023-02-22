import { ICharacterTrait } from '../../types';
import { characterTraitModelMock } from './characterTraitModelMock';

export const characterTraitsPairModelMock = (
    id = '1',
    mainCharacterTrait?: ICharacterTrait,
    oppositeCharacterTrait?: ICharacterTrait,
) => {
    const main = mainCharacterTrait || characterTraitModelMock('trait1');
    const opposite = oppositeCharacterTrait || characterTraitModelMock('trait2');

    return {
        id,
        mainCharacterTrait: main,
        oppositeCharacterTrait: opposite,
        mainPercent: main.percent,
        oppositePercent: main.percent,

        reset: jest.fn(),
        setPercentForMainCharacterTrait: jest.fn(),
    };
};
