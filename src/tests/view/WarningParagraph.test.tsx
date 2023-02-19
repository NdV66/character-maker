import { render } from '@testing-library/react';
import { TEST_IDS } from '../../defaults';

import { DARK_THEME } from '../../styles';
import { WarningParagraph } from '../../view/elements';

const DEFAULT_PROPS = {
    theme: DARK_THEME,
};

const TEXT = 'lotr';

describe('WarningParagraph', () => {
    test('Should render correctly', () => {
        const { getByTestId } = render(<WarningParagraph {...DEFAULT_PROPS}>{TEXT}</WarningParagraph>);
        const element = getByTestId(TEST_IDS.WARNING_PARAGRAPH);

        expect(element).toBeInTheDocument();
        expect(element).toHaveTextContent(TEXT);
    });

    test('Should be antd warning paragraph', () => {
        const { getByTestId } = render(<WarningParagraph {...DEFAULT_PROPS} />);
        const element = getByTestId(TEST_IDS.WARNING_PARAGRAPH);
        expect(element).toHaveClass('ant-typography-warning');
    });
});

export {};
