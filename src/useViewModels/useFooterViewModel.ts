import packageInfo from '../../package.json';
import { TEXTS_EN } from '../langs/en';
import { DARK_THEME } from '../styles';

export const useFooterViewModel = () => {
    return {
        translations: TEXTS_EN,
        theme: DARK_THEME,
        version: packageInfo.version,
    };
};
