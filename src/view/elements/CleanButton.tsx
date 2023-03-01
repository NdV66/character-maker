/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { TEST_IDS } from '../../defaults';

import { AppButton } from '.';
import { TTheme, TTranslations } from '../../types';
import { DeleteOutlined } from '@ant-design/icons';

type Props = {
    theme: TTheme;
    onCleanAll: () => void;
    translations: TTranslations;
    disabled: boolean;
};

export const CleanButton: React.FC<Props> = ({ theme, onCleanAll, disabled }) => {
    const themedStyles = styles(theme);

    return (
        <div css={themedStyles.cleanWrapper} data-test-id={TEST_IDS.CLEAN_EVERYTHING_BUTTON}>
            <AppButton theme={theme} onClick={onCleanAll} disabled={disabled} icon={<DeleteOutlined />} />
        </div>
    );
};

const styles = (theme: TTheme) => ({
    cleanWrapper: css`
        display: flex;
        justify-content: flex-end;
        margin-top: ${theme.baseSpace * 3}px;
    `,
});
