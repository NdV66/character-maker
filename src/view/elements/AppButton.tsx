/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { TEST_IDS } from '../../defaults';
import { TTheme } from '../../types';

type Props = {
    onClick: () => void;
    theme: TTheme;
    icon?: React.ReactNode;
    disabled: boolean;
    text?: string;
};

export const AppButton: React.FC<Props> = ({ onClick, theme, disabled, icon, text }) => {
    const themedStyles = styles(theme);

    const handleOnClick = disabled ? () => {} : onClick;

    return (
        <div
            role="button"
            onClick={handleOnClick}
            css={[themedStyles.button, disabled && themedStyles.disabled]}
            data-test-id={TEST_IDS.APP_BUTTON}
        >
            <span css={themedStyles.text}>{text}</span>
            {icon}
        </div>
    );
};

const styles = (theme: TTheme) => ({
    button: css`
        user-select: none;
        color: ${theme.primary};
        font-size: ${theme.smallFontSize}px;
        cursor: pointer;
    `,
    disabled: css`
        cursor: default;
        pointer-events: all !important;
    `,
    text: css`
        margin-right: ${theme.baseSpace / 2}px;
    `,
});
