/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { Switch, SwitchProps } from 'antd';
import { TEST_IDS } from '../../defaults';
import { TTheme } from '../../types';

type Props = Pick<SwitchProps, 'unCheckedChildren' | 'checked' | 'checkedChildren'> & {
    onChange: () => void;
    theme: TTheme;
};

export const SwitchButton: React.FC<Props> = ({ onChange, theme, ...props }) => {
    const themedStyles = styles(theme);

    return <Switch onChange={onChange} {...props} data-test-id={TEST_IDS.SWITCH_BUTTON} css={themedStyles.wrapper} />;
};

const styles = (theme: TTheme) => ({
    wrapper: css`
        .ant-switch-inner-unchecked,
        .ant-switch-inner-checked {
            font-size: ${0.7 * theme.fontSize}px !important;
            text-transform: uppercase;
        }
    `,
});
