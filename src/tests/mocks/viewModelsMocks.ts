import { ICharacterTrait } from '../../types';
import { TEXTS_EN } from '../../langs/en';
import { DARK_THEME } from '../../styles';
import { AppTheme } from '../../types';
import { characterTraitsPairModelMock } from './characterTraitsPairModelMock';
import { characterTraitModelMock } from './characterTraitModelMock';

const PAIR_ID = 'pair1';
export const MAIN_TRAIT = characterTraitModelMock('1', 'key1', 20) as ICharacterTrait;
export const OPPOSITE_TRAIT = characterTraitModelMock('2', 'key2', 80) as ICharacterTrait;
export const TRAIT_PAIR = characterTraitsPairModelMock(PAIR_ID, MAIN_TRAIT, OPPOSITE_TRAIT);
export const TRAIT_PAIRS = [TRAIT_PAIR];

export const PAGE_VIEW_MODEL_DATA = {
    theme: DARK_THEME,
    translations: TEXTS_EN,
    antdTheme: {} as any,
    isLoading: false,
    appTheme: AppTheme.DARK,
};

export const FOOTER_VIEW_MODEL_DATA = {
    theme: DARK_THEME,
    translations: TEXTS_EN,
    version: '1.0.0',
};

export const THEME_VIEW_MODEL_DATA = {
    appTheme: AppTheme.DARK,
    translations: TEXTS_EN,
    onChangeTheme: jest.fn(),
};

export const MAIN_VIEW_MODEL_DATA = {
    theme: DARK_THEME,
};
