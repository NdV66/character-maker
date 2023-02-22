/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { TEST_IDS } from '../../defaults';

import { TextButton } from '.';
import { TTheme, TTranslations } from '../../types';

type Props = {
    theme: TTheme;
    onCleanAll: () => void;
    translations: TTranslations;
    disabled: boolean;
};

export const CleanButton: React.FC<Props> = ({ theme, onCleanAll, disabled, translations }) => {
    const themedStyles = styles();

    return (
        <div css={themedStyles.cleanWrapper} data-test-id={TEST_IDS.CLEAN_EVERYTHING_BUTTON}>
            <TextButton theme={theme} onClick={onCleanAll} small disabled={disabled}>
                {translations.CLEAN}
            </TextButton>
        </div>
    );
};

const styles = () => ({
    cleanWrapper: css`
        display: flex;
        justify-content: flex-end;
    `,
});
