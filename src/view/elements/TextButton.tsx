/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { PropsWithChildren } from 'react';
import { TEST_IDS } from '../../defaults';
import { TTheme } from '../../types';

type Props = PropsWithChildren<{
    onClick: () => void;
    theme: TTheme;

    small?: boolean;
    disabled?: boolean;
}>;

export const TextButton: React.FC<Props> = ({ onClick, theme, children, small, disabled }) => {
    const themedStyles = styles(theme, small);

    const handleOnClick = disabled ? () => {} : onClick;

    return (
        <div
            role="button"
            onClick={handleOnClick}
            css={[themedStyles.button, disabled && themedStyles.disabled]}
            data-test-id={TEST_IDS.TEXT_BUTTON}
        >
            {children}
        </div>
    );
};

const styles = (theme: TTheme, small?: boolean) => ({
    button: css`
        user-select: none;
        color: ${theme.primary};
        font-size: ${small ? theme.smallFontSize : theme.fontSize}px;
        cursor: pointer;
        font-weight: 400;

        &:hover,
        &:active {
            font-weight: 700;
        }
    `,
    disabled: css`
        cursor: default;
        pointer-events: all !important;
        opacity: 0.3;
    `,
});
