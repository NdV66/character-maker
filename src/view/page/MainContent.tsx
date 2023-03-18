/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import Card from 'antd/es/card/Card';
import { TEST_IDS } from '../../defaults';
import { TTheme } from '../../types';
import { useMainContentViewModel } from '../../useViewModels/useMainContentViewModel';

import { CharacterTraitsElement } from './CharacterTraitsElement';
import { AppInfo } from '../elements';
import { ChangeAppModeElement } from './ChangeAppModeElement';

export const MainContent: React.FC = () => {
    const { theme, translations } = useMainContentViewModel();
    const themedStyles = styles(theme);

    return (
        <Card css={themedStyles.card} data-test-id={TEST_IDS.MAIN_CONTENT}>
            <AppInfo text={translations.INFO_TEXT} theme={theme} />
            <div css={themedStyles.mode}>
                <ChangeAppModeElement />
            </div>
            <CharacterTraitsElement />
        </Card>
    );
};

const styles = (theme: TTheme) => ({
    mode: css`
        display: flex;
        justify-content: flex-end;
    `,
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
