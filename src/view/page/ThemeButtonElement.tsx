import { SwitchButton } from '../elements';
import { useThemeButtonElementViewModel } from '../../useViewModels';
import { DEFAULTS } from '../../defaults';

export const ThemeButtonElement = () => {
    const { onChangeTheme, appTheme, translations } = useThemeButtonElementViewModel();
    const isDefaultTheme = appTheme === DEFAULTS.APP_THEME;

    return translations ? (
        <SwitchButton
            onChange={onChangeTheme}
            checked={isDefaultTheme}
            checkedChildren={translations.DARK}
            unCheckedChildren={translations.LIGHT}
        />
    ) : null;
};
