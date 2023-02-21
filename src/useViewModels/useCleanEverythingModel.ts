import { TEXTS_EN } from '../langs/en';
import { DARK_THEME } from '../styles';

export const useCleanEverythingModel = () => {
    const disabled = false;

    const onCleanAll = () => {};

    return {
        theme: DARK_THEME,
        onCleanAll,
        translations: TEXTS_EN,
        disabled,
    };
};
