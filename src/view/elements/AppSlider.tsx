/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Row, Col } from 'antd';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { DEFAULTS } from '../../defaults';
import { TTheme } from '../../types';
import { AppSliderValue } from './AppSliderValue';

type Props = {
    leftText: string;
    rightText: string;
    theme: TTheme;
    onChange: (value: number) => void;
    mainValue: number;
    oppositeValue: number;
};

const columns = {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 20,
};

export const AppSlider: React.FC<Props> = ({ leftText, rightText, theme, mainValue, onChange, oppositeValue }) => {
    const themedStyles = styles(theme);

    return (
        <Row justify="center" align="middle">
            <AppSliderValue theme={theme} value={mainValue} text={leftText} position="left" />

            <Col {...columns}>
                <div css={themedStyles.slider}>
                    <Slider
                        marks={DEFAULTS.MARKS}
                        max={DEFAULTS.MAX_PERCENT}
                        min={DEFAULTS.MIN_PERCENT}
                        value={mainValue}
                        onChange={(value) => onChange(value as number)}
                        css={themedStyles.customSlider}
                        railStyle={{ backgroundColor: theme.pageBackground }}
                        trackStyle={{ backgroundColor: theme.primary }}
                        dotStyle={dotStyle(theme)}
                        handleStyle={handledStyle(theme)}
                    />
                </div>
            </Col>

            <AppSliderValue theme={theme} value={oppositeValue} text={rightText} position="right" />
        </Row>
    );
};

const dotStyle = (theme: TTheme) => ({
    backgroundColor: theme.primary,
    borderColor: theme.primary,
});

const handledStyle = (theme: TTheme) => ({
    borderColor: theme.primary,
    backgroundColor: theme.primary,
    opacity: 1,
    height: 2 * theme.baseSpace,
    width: 2 * theme.baseSpace,
});

const styles = (theme: TTheme) => ({
    slider: css`
        padding: ${theme.baseSpace * 3}px ${theme.baseSpace * 2}px;
    `,
    customSlider: css`
        .rc-slider-mark-text,
        .rc-slider-mark-text-active {
            color: ${theme.primary};
            font-size: ${theme.smallFontSize * 0.8}px;
            user-select: none;
        }

        .rc-slider-handle-dragging {
            box-shadow: 0 0 0 2px ${theme.primary} !important;
        }
    `,
});
