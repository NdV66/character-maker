import { useCharacterTraitsElementViewModel } from '../../viewModels/useCharacterTraitsElementViewModel';
import { AppSlider } from '../elements';

export const CharacterTraitsElement: React.FC = () => {
    const { theme, onChangeCharacterTrait, currentValue } = useCharacterTraitsElementViewModel();

    return (
        <div>
            <AppSlider
                leftText="Uczynny"
                rightText="Egoistyczny"
                onChange={onChangeCharacterTrait}
                theme={theme}
                value={currentValue}
            />
        </div>
    );
};
