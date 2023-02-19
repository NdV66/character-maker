import { render } from '@testing-library/react';
import { TEST_IDS } from '../../defaults';
import { TEXTS_EN } from '../../langs/en';
import { DARK_THEME } from '../../styles';
import { AppTheme } from '../../types';
import { Page } from '../../view/page';
import * as viewModel from '../../viewModels/usePageViewModel';
import * as footerViewModel from '../../viewModels/useFooterViewModel';
import * as mainViewModel from '../../viewModels/useMainContentViewModel';
import * as themeViewModel from '../../viewModels/useThemeButtonElementViewModel';
import { FOOTER_VIEW_MODEL_DATA, MAIN_VIEW_MODEL_DATA, THEME_VIEW_MODEL_DATA } from '../mocks';

const VIEW_MODEL_DATA = {
    theme: DARK_THEME,
    translations: TEXTS_EN,
    antdTheme: {} as any,
    isLoading: false,
    appTheme: AppTheme.DARK,
};

describe('Page', () => {
    const text = 'classic';

    beforeEach(() => {
        jest.spyOn(footerViewModel, 'useFooterViewModel').mockReturnValue(FOOTER_VIEW_MODEL_DATA);
        jest.spyOn(mainViewModel, 'useMainContentViewModel').mockReturnValue(MAIN_VIEW_MODEL_DATA);
        jest.spyOn(themeViewModel, 'useThemeButtonElementViewModel').mockReturnValue(THEME_VIEW_MODEL_DATA);
    });

    test('Should render correctly', () => {
        jest.spyOn(viewModel, 'usePageViewModel').mockReturnValue(VIEW_MODEL_DATA);
        const { getByTestId, getByText, container } = render(<Page />);

        expect(getByTestId(TEST_IDS.APP_HEADER)).toBeInTheDocument();
        expect(getByTestId(TEST_IDS.SWITCH_BUTTON)).toBeInTheDocument();
        expect(getByText(text)).toBeInTheDocument();
        expect(container.querySelector('.ant-spin-spinning')).not.toBeInTheDocument();
    });

    test('Should show loader if this is loading', () => {
        jest.spyOn(viewModel, 'usePageViewModel').mockReturnValue({ ...VIEW_MODEL_DATA, isLoading: true });
        const { getByTestId, getByText, container } = render(<Page />);

        expect(getByTestId(TEST_IDS.APP_HEADER)).toBeInTheDocument();
        expect(getByTestId(TEST_IDS.SWITCH_BUTTON)).toBeInTheDocument();
        expect(getByText(text)).toBeInTheDocument();
        expect(container.querySelector('.ant-spin-spinning')).toBeInTheDocument();
    });
});

export {};
