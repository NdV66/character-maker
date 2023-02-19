import { useAppContext } from '../context';

export const useCleanEverythingModel = () => {
    const { translations, theme } = useAppContext();

    const disabled = false;

    const onCleanAll = () => {};

    return {
        theme,
        onCleanAll,
        translations,
        disabled,
    };
};
