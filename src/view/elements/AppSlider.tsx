/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { Slider } from 'antd';
import { DEFAULTS } from '../../defaults';
import { TTheme } from '../../types';

type Props = {
    leftText: string;
    rightText: string;
    theme: TTheme;
    onChange: (value: number) => void;
    value: number;
};

export const AppSlider: React.FC<Props> = ({ leftText, rightText, theme, value, onChange }) => {
    const themedStyles = styles(theme);

    return (
        <div css={themedStyles.wrapper}>
            <div css={themedStyles.text}>{leftText}</div>
            <div css={themedStyles.slider}>
                <Slider
                    marks={{ 50: '50' }}
                    max={DEFAULTS.MAX_PERCENT}
                    min={DEFAULTS.MIN_PERCENT}
                    value={value}
                    onChange={onChange}
                />
            </div>
            <div css={themedStyles.text}>{rightText}</div>
        </div>
    );
};

const styles = (theme: TTheme) => ({
    wrapper: css`
        display: flex;
        justify-content: center;
        align-items: center;
    `,
    slider: css`
        width: 600px;
        padding: ${theme.baseSpace * 2}px;
    `,
    text: css`
        text-transform: uppercase;
        font-size: ${theme.smallFontSize}px;
    `,
});
