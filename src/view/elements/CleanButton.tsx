import { TEST_IDS } from '../../defaults';
import { AppButton } from '.';
import { TTheme, TTranslations } from '../../types';

type Props = {
    theme: TTheme;
    onCleanAll: () => void;
    translations: TTranslations;
    disabled: boolean;
};

export const CleanButton: React.FC<Props> = ({ theme, onCleanAll, disabled, translations }) => (
    <div data-test-id={TEST_IDS.CLEAN_EVERYTHING_BUTTON}>
        <AppButton theme={theme} onClick={onCleanAll} disabled={disabled} text={translations.CLEAN} />
    </div>
);
