import { render } from '@testing-library/react';
import { DEFAULTS, TEST_IDS } from '../../defaults';
import { FooterElement } from '../../view/page/FooterElement';
import * as viewModel from '../../viewModels/useFooterViewModel';
import * as themeViewModel from '../../viewModels/useThemeButtonElementViewModel';
import { FOOTER_VIEW_MODEL_DATA, THEME_VIEW_MODEL_DATA } from '../mocks';

describe('FooterElement', () => {
    test('Should render footer correctly', () => {
        jest.spyOn(viewModel, 'useFooterViewModel').mockReturnValue(FOOTER_VIEW_MODEL_DATA);
        jest.spyOn(themeViewModel, 'useThemeButtonElementViewModel').mockReturnValue(THEME_VIEW_MODEL_DATA);
        const text = `v${FOOTER_VIEW_MODEL_DATA.version}, ${
            FOOTER_VIEW_MODEL_DATA.translations.AUTHOR
        } ${new Date().getFullYear()}`;
        const { getByTestId, getByText } = render(<FooterElement />);

        expect(getByTestId(TEST_IDS.FOOTER_ELEMENT)).toBeInTheDocument();
        expect(getByTestId(TEST_IDS.SWITCH_BUTTON)).toBeInTheDocument();
        expect(getByText(text)).toBeInTheDocument();
        expect(getByText(FOOTER_VIEW_MODEL_DATA.translations.REPO)).toBeInTheDocument();
        expect(getByText(FOOTER_VIEW_MODEL_DATA.translations.REPO).closest('a')).toHaveAttribute(
            'href',
            DEFAULTS.REPO_URL,
        );
    });
});

export {};
