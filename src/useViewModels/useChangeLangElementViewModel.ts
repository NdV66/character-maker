import { AppLangs, IChangeLangElementViewModel, Models } from '../types';
import { useStateWithObservableWithInit } from '../tools';
import { DEFAULTS } from '../defaults';
import { MenuProps } from 'antd';
import { getModelByKey } from '../context';

export const useChangeLangElementViewModel = () => {
    const viewModel = getModelByKey<IChangeLangElementViewModel>(Models.CHANGE_LANG_ELEMENT_VIEW_MODEL);
    const appLang = useStateWithObservableWithInit(viewModel.appLang$, DEFAULTS.LANG);
    const items = useStateWithObservableWithInit(viewModel.items$, []);

    const onClickItem: MenuProps['onClick'] = (e) => viewModel.changeAppLang(e.key as AppLangs);

    return {
        onClickItem,
        appLang,
        items,
    };
};
