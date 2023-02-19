/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { Menu } from 'antd';
import { TEST_IDS } from '../../defaults';
import { useChangeLangElementViewModel } from '../../useViewModels/useChangeLangElementViewModel';

export const ChangeAppLangElement = () => {
    const { onClickItem, appLang, items } = useChangeLangElementViewModel();
    const themedStyles = styles();

    return (
        <Menu
            mode="horizontal"
            items={items}
            selectedKeys={[appLang]}
            onClick={onClickItem}
            css={themedStyles.menu}
            data-test-id={TEST_IDS.CHANGE_APP_LANG_ELEMENT}
        />
    );
};

const styles = () => ({
    menu: css`
        background: none;
        width: 180px;
        display: flex;
        justify-content: center;
    `,
});
