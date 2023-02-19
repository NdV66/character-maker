/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { Layout } from 'antd';
import { TEST_IDS } from '../../defaults';
import { TTheme, TTranslations } from '../../types';
import { ChangeAppLangElement } from './ChangeAppLangElement';

const { Header } = Layout;

type Props = {
    theme: TTheme;
    translations: TTranslations;
};

export const AppHeader: React.FC<Props> = ({ theme, translations }) => {
    const themedStyles = styles(theme);

    return (
        <Header css={themedStyles.header} data-test-id={TEST_IDS.APP_HEADER}>
            <div css={themedStyles.logo}>{translations.APP_NAME}</div>
            <ChangeAppLangElement />
        </Header>
    );
};

const styles = (theme: TTheme) => ({
    logo: css`
        font-weight: 600;
        font-size: ${theme.smallFontSize}px;
    `,
    header: css`
        &.ant-layout-header {
            display: flex;
            justify-content: space-between;
            padding-inline: 0;
            padding: 0 ${2 * theme.baseSpace}px;
            background-color: ${theme.background};
            color: ${theme.primary};
        }

        .ant-menu-title-content {
            font-size: ${theme.smallFontSize}px;
        }
    `,
});
