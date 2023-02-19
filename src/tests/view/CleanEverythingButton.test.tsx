import { render } from '@testing-library/react';
import { TEST_IDS } from '../../defaults';
import { TEXTS_EN } from '../../langs/en';
import { DARK_THEME } from '../../styles';
import { CleanEverythingButton } from '../../view/page/CleanEverytingButton';
import * as viewModel from '../../viewModels/useCleanEverythingModel';

const VIEW_MODEL_DATA = {
    translations: TEXTS_EN,
    theme: DARK_THEME,
    onCleanAll: jest.fn(),
    disabled: false,
};

const mockViewModelDefault = () => jest.spyOn(viewModel, 'useCleanEverythingModel').mockReturnValue(VIEW_MODEL_DATA);

describe('AppHeader', () => {
    test('Should render correctly', () => {
        mockViewModelDefault();
        const { getByTestId } = render(<CleanEverythingButton />);
        expect(getByTestId(TEST_IDS.CLEAN_EVERYTHING_BUTTON)).toBeInTheDocument();
    });

    test('Should display correct text', () => {
        mockViewModelDefault();
        const { getByText } = render(<CleanEverythingButton />);
        expect(getByText(TEXTS_EN.CLEAN)).toBeInTheDocument();
    });
});

export {};
