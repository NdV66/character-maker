/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { AppButton, CleanButton } from '.';
import { TTheme, TTranslations } from '../../types';

type Props = {
    theme: TTheme;
    translations: TTranslations;
    isExporting: boolean;
    onCleanAll: () => void;
    onExport: () => void;
};

export const ButtonsElement: React.FC<Props> = ({ theme, translations, isExporting, onCleanAll, onExport }) => {
    const themedStyles = styles(theme);

    return (
        <div css={themedStyles.buttons}>
            <CleanButton theme={theme} translations={translations} onCleanAll={onCleanAll} disabled={isExporting} />
            <AppButton onClick={onExport} theme={theme} text={translations.EXPORT} disabled={isExporting} />
        </div>
    );
};

const styles = (theme: TTheme) => ({
    buttons: css`
        display: flex;
        justify-content: space-between;
        margin-top: ${3 * theme.baseSpace}px;
    `,
});
