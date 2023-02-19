import { render } from '@testing-library/react';
import { TEST_IDS } from '../../defaults';
import { ThemeButtonElement } from '../../view/page/ThemeButtonElement';
import * as viewModel from '../../useViewModels/useThemeButtonElementViewModel';
import { THEME_VIEW_MODEL_DATA } from '../mocks';

describe('MainContent', () => {
    test('Should render correctly', () => {
        jest.spyOn(viewModel, 'useThemeButtonElementViewModel').mockReturnValue(THEME_VIEW_MODEL_DATA);
        const { getByTestId } = render(<ThemeButtonElement />);

        expect(getByTestId(TEST_IDS.SWITCH_BUTTON)).toBeInTheDocument();
    });
});

export {};
