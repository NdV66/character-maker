/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Col } from 'antd';

import { TTheme } from '../../types';

type Props = {
    text: string;
    theme: TTheme;
    value: number;
};

const columns = {
    xs: 7,
    sm: 6,
    md: 5,
    lg: 4,
    xl: 3,
    xxl: 2,
};

export const AppSliderValue: React.FC<Props> = ({ text, theme, value }) => {
    const themedStyles = styles(theme);

    return (
        <Col {...columns}>
            <div css={themedStyles.wrapper}>
                <span css={themedStyles.text}>{text}</span>
                <span css={themedStyles.value}>({value})</span>
            </div>
        </Col>
    );
};

const styles = (theme: TTheme) => ({
    wrapper: css`
        text-transform: uppercase;
        font-size: ${theme.smallFontSize}px;
        user-select: none;

        display: flex;
        justify-content: center;
        align-items: center;
    `,
    value: css`
        font-weight: 700;
        width: 27px;
        user-select: none;
    `,

    text: css`
        margin-right: ${theme.baseSpace * 0.5}px;
    `,
});
