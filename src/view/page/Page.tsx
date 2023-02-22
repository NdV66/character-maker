/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { Layout, ConfigProvider, Col, Row, Spin } from 'antd';
import { TTheme } from '../../types';
import { usePageViewModel } from '../../useViewModels';
import { AppHeader } from './AppHeader';
import { FooterElement, footerHeight } from './FooterElement';
import { MainContent } from './MainContent';
import { AimOutlined } from '@ant-design/icons';

const { Content } = Layout;

const columns = {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 20,
    xl: 18,
    xxl: 12,
};

export const Page = () => {
    const { theme, translations, antdTheme, isLoading } = usePageViewModel();
    const themedStyles = styles(theme);

    const antIcon = <AimOutlined style={{ fontSize: theme.fontSize * 4 }} spin />;

    return (
        <Spin spinning={isLoading} indicator={antIcon} css={themedStyles.spin}>
            <ConfigProvider theme={antdTheme}>
                <Layout>
                    <AppHeader theme={theme} translations={translations} />

                    <section>
                        <Content css={themedStyles.wrapper}>
                            <Row justify="center">
                                <Col {...columns}>
                                    <div css={themedStyles.mainWrapper}>
                                        <MainContent />
                                    </div>
                                </Col>
                            </Row>
                        </Content>
                    </section>

                    <FooterElement />
                </Layout>
            </ConfigProvider>
        </Spin>
    );
};

const headerHeight = 64;
const summaryHeight = headerHeight + footerHeight;

const styles = (theme: TTheme) => ({
    spin: css`
        .anticon-spin {
            color: #5727a3;
        }
    `,
    wrapper: css`
        &.ant-layout-content {
            padding: ${4 * theme.baseSpace}px 0;
            min-height: calc(100vh - ${summaryHeight}px);
            background: ${theme.pageBackground};
        }
    `,
    theme: css`
        display: flex;
        justify-content: flex-end;
    `,
    mainWrapper: css`
        padding: ${4 * theme.baseSpace}px 0 0 0;
    `,
});
