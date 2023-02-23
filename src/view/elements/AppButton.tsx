/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { TEST_IDS } from '../../defaults';
import { TTheme } from '../../types';

type Props = {
    onClick: () => void;
    theme: TTheme;
    icon: React.ReactNode;
    small?: boolean;
    disabled?: boolean;
};

export const AppButton: React.FC<Props> = ({ onClick, theme, small, disabled, icon }) => {
    const themedStyles = styles(theme, small);

    const handleOnClick = disabled ? () => {} : onClick;

    return (
        <div
            role="button"
            onClick={handleOnClick}
            css={[themedStyles.button, disabled && themedStyles.disabled]}
            data-test-id={TEST_IDS.APP_BUTTON}
        >
            {icon}
        </div>
    );
};

const styles = (theme: TTheme, small?: boolean) => ({
    button: css`
        user-select: none;
        color: ${theme.primary};
        font-size: ${small ? theme.smallFontSize : theme.fontSize}px;
        cursor: pointer;
    `,
    disabled: css`
        cursor: default;
        pointer-events: all !important;
    `,
});
