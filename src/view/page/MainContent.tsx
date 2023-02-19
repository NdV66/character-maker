/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import Card from 'antd/es/card/Card';
import { TEST_IDS } from '../../defaults';
import { TTheme } from '../../types';
import { useMainContentViewModel } from '../../viewModels/useMainContentViewModel';
import { CharacterTraitsElement } from './CharacterTraitsElement';

export const MainContent: React.FC = () => {
    const { theme } = useMainContentViewModel();
    const themedStyles = styles(theme);

    return (
        <Card css={themedStyles.card} data-test-id={TEST_IDS.MAIN_CONTENT}>
            <CharacterTraitsElement />
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
    `,
});
