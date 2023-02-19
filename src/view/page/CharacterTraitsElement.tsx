import { CHARACTER_TRAITS_PAIRS } from '../../defaults';
import { useCharacterTraitsElementViewModel } from '../../viewModels/useCharacterTraitsElementViewModel';
import { AppSlider } from '../elements';

export const CharacterTraitsElement: React.FC = () => {
    const { theme, onChangeCharacterTrait, currentValue, translations } = useCharacterTraitsElementViewModel();

    return (
        <div>
            {translations?.CHARACTER_TRAITS &&
                CHARACTER_TRAITS_PAIRS.map((trait) => (
                    <AppSlider
                        key={trait.id}
                        leftText={translations.CHARACTER_TRAITS[trait.name]}
                        rightText={translations.CHARACTER_TRAITS[trait.opposite]}
                        onChange={onChangeCharacterTrait}
                        theme={theme}
                        value={currentValue}
                    />
                ))}
        </div>
    );
};
