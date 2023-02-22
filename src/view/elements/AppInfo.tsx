/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { TTheme } from '../../types';

type Props = {
    theme: TTheme;
    text: string;
};

export const AppInfo: React.FC<Props> = ({ text, theme }) => {
    const themedStyles = styles(theme);

    return <p css={themedStyles.wrapper}>{text}</p>;
};

const styles = (theme: TTheme) => ({
    wrapper: css`
        font-size: ${theme.smallFontSize}px;
        text-align: center;
        margin-bottom: ${theme.baseSpace * 4}px;
    `,
});
