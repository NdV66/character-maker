import { useCharacterTraitsElementViewModel } from '../../viewModels/useCharacterTraitsElementViewModel';
import { AppSlider } from '../elements';

export const CharacterTraitsElement: React.FC = () => {
    const { theme, onChangeCharacterTrait, currentValue, translations, characterTraitsPairs } =
        useCharacterTraitsElementViewModel();

    return (
        <div>
            {translations?.CHARACTER_TRAITS &&
                characterTraitsPairs.map((trait) => (
                    <AppSlider
                        key={trait.id}
                        leftText={translations.CHARACTER_TRAITS[trait.mainCharacterTrait.nameTranslationKey]}
                        rightText={translations.CHARACTER_TRAITS[trait.oppositeCharacterTrait.nameTranslationKey]}
                        onChange={onChangeCharacterTrait}
                        theme={theme}
                        value={currentValue}
                    />
                ))}
        </div>
    );
};
