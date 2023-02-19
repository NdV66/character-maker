import { useAppContext } from '../context';
import packageInfo from '../../package.json';

export const useFooterViewModel = () => {
    const { theme, translations } = useAppContext();

    return {
        translations,
        theme,
        version: packageInfo.version,
    };
};
