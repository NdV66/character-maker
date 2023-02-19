import { bufferCount, concatMap, map, identity } from 'rxjs';
import { getModelByKey } from '../context';
import { AppLangs, Models, TTranslationsLang, IAppGeneralSettings } from '../types';
import { useStateWithObservableWithInit } from '../tools';
import { DEFAULTS } from '../defaults';
import { MenuProps } from 'antd';
import { useMemo } from 'react';

type ItemType = {
    key: string;
    label: string;
};

const mapToItem = (lang: TTranslationsLang) => ({
    key: lang.value,
    label: lang.label,
});

export const useChangeLangElementViewModel = () => {
    const { appLangModel } = getModelByKey<IAppGeneralSettings>(Models.APP_GENERAL_SETTINGS);

    const itemsSource = useMemo(
        () =>
            appLangModel.translations.pipe(
                map((translations) => translations.LANGS),
                concatMap(identity),
                map(mapToItem),
                bufferCount(DEFAULTS.LANGS_AMOUNT),
            ),
        [],
    );

    const appLang = useStateWithObservableWithInit(appLangModel.appLang, DEFAULTS.LANG);
    const items = useStateWithObservableWithInit<ItemType[]>(itemsSource, []);

    const onClickItem: MenuProps['onClick'] = (e) => {
        appLangModel.changeAppLang(e.key as AppLangs);
    };

    return {
        onClickItem,
        appLang,
        items,
    };
};
