/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import Paragraph from 'antd/es/typography/Paragraph';
import { TEST_IDS } from '../../defaults';
import { TTheme } from '../../types';

type TAlign = 'center' | 'left' | 'right';

type Props = {
    theme: TTheme;
    align?: TAlign;
};

export const WarningParagraph: React.FC<React.PropsWithChildren<Props>> = ({ theme, children, align = 'center' }) => {
    const themedStyles = styles(theme);

    return (
        <Paragraph type="warning" css={themedStyles.text(align)} data-test-id={TEST_IDS.WARNING_PARAGRAPH}>
            {children}
        </Paragraph>
    );
};

const styles = (theme: TTheme) => ({
    text: (align: TAlign) => css`
        font-size: ${0.8 * theme.fontSize}px;
        font-style: italic;
        text-align: ${align};
    `,
});
