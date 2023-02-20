import { AppLangs } from '../types';
import { useStateWithObservableWithInit } from '../tools';
import { DEFAULTS } from '../defaults';
import { MenuProps } from 'antd';
import { useMemo } from 'react';
import { ChangeLangElementViewModel } from '../models/viewModels/ChangeLangElementViewModel';

export const useChangeLangElementViewModel = () => {
    const viewModel = useMemo(() => new ChangeLangElementViewModel(), []);
    const appLang = useStateWithObservableWithInit(viewModel.appLang$, DEFAULTS.LANG);
    const items = useStateWithObservableWithInit(viewModel.items$, []);

    const onClickItem: MenuProps['onClick'] = (e) => viewModel.changeAppLang(e.key as AppLangs);

    return {
        onClickItem,
        appLang,
        items,
    };
};
