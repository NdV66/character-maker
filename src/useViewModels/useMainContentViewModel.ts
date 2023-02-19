import { useAppContext } from '../context';

export const useMainContentViewModel = () => {
    const { theme } = useAppContext();

    return {
        theme,
    };
};
