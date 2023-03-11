import { useChangeAppModeElementViewModel } from '../../useViewModels';
import { SwitchButton } from '../elements';

export const ChangeAppModeElement: React.FC = () => {
    const { changeAppMode, translations, isFreeHandMode, theme } = useChangeAppModeElementViewModel();

    return (
        <SwitchButton
            onChange={changeAppMode}
            checked={isFreeHandMode}
            checkedChildren={translations.STRICT_MODE}
            unCheckedChildren={translations.FREE_HAND_MODE}
            theme={theme}
        />
    );
};
