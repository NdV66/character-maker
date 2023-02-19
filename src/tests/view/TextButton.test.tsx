import { render } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';

import { DARK_THEME } from '../../styles';
import { TextButton } from '../../view/elements';
import { act } from 'react-dom/test-utils';
import { TEST_IDS } from '../../defaults';

const DEFAULT_PROPS = {
    theme: DARK_THEME,
    onClick: jest.fn(),
};

const TEXT = 'lotr';

describe('TextButton', () => {
    test('Should render correctly', () => {
        const { getByTestId } = render(<TextButton {...DEFAULT_PROPS}>{TEXT}</TextButton>);
        const element = getByTestId(TEST_IDS.TEXT_BUTTON);

        expect(element).toBeInTheDocument();
        expect(element).toHaveTextContent(TEXT);
    });

    test('Should call onClick from props on click', () => {
        const { getByTestId } = render(<TextButton {...DEFAULT_PROPS}>{TEXT}</TextButton>);
        const element = getByTestId(TEST_IDS.TEXT_BUTTON);

        act(() => fireEvent.click(element));
        expect(DEFAULT_PROPS.onClick).toHaveBeenCalledTimes(1);
    });

    test('Should not call onClick from props, when element is disabled', () => {
        const { getByTestId } = render(
            <TextButton {...DEFAULT_PROPS} disabled>
                {TEXT}
            </TextButton>,
        );
        const element = getByTestId(TEST_IDS.TEXT_BUTTON);

        act(() => fireEvent.click(element));
        expect(DEFAULT_PROPS.onClick).not.toHaveBeenCalled();
    });
});

export {};
