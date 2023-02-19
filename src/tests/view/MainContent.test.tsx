import { render } from '@testing-library/react';
import { TEST_IDS } from '../../defaults';
import { DARK_THEME } from '../../styles';
import { MainContent } from '../../view/page/MainContent';
import * as viewModel from '../../viewModels/useMainContentViewModel';

const VIEW_MODEL_DATA = {
    theme: DARK_THEME,
};

describe('MainContent', () => {
    test('Should render correctly', () => {
        const text = 'classic';
        jest.spyOn(viewModel, 'useMainContentViewModel').mockReturnValue(VIEW_MODEL_DATA);
        const { getByTestId, getByText } = render(<MainContent />);

        expect(getByTestId(TEST_IDS.MAIN_CONTENT)).toBeInTheDocument();
        expect(getByText(text)).toBeInTheDocument();
    });
});

export {};
