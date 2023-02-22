/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import Card from 'antd/es/card/Card';
import { TEST_IDS } from '../../defaults';
import { TTheme } from '../../types';
import { useMainContentViewModel } from '../../useViewModels/useMainContentViewModel';
import { AppInfo } from '../elements/AppInfo';
import { CharacterTraitsElement } from './CharacterTraitsElement';
import { CleanEverythingButton } from './CleanEverytingButton';

export const MainContent: React.FC = () => {
    const { theme, translations } = useMainContentViewModel();
    const themedStyles = styles(theme);

    return (
        <Card css={themedStyles.card} data-test-id={TEST_IDS.MAIN_CONTENT}>
            <AppInfo text={translations.INFO_TEXT} theme={theme} />
            <CharacterTraitsElement />
            <CleanEverythingButton />
        </Card>
    );
};

const styles = (theme: TTheme) => ({
    card: css`
        .ant-card-head {
            color: ${theme.accent};
        }

        .ant-tabs-tab-btn {
            font-size: ${theme.smallFontSize}px;
        }

        .ant-card-head {
            border-bottom: none;
        }

        .ant-card-body {
            padding: ${theme.baseSpace * 4}px ${theme.baseSpace * 2}px;
        }
    `,
});
