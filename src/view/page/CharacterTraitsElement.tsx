import { useCharacterTraitsElementViewModel } from '../../viewModels/useCharacterTraitsElementViewModel';
import { AppSlider } from '../elements';

export const CharacterTraitsElement: React.FC = () => {
    const { theme, onChangeCharacterTrait, translations, characterTraitsPairs, dataSource } =
        useCharacterTraitsElementViewModel();

    return (
        <div>
            {translations?.CHARACTER_TRAITS &&
                characterTraitsPairs.map((trait) => {
                    return (
                        <AppSlider
                            key={trait.id}
                            leftText={translations.CHARACTER_TRAITS[trait.mainCharacterTrait.nameTranslationKey]}
                            rightText={translations.CHARACTER_TRAITS[trait.oppositeCharacterTrait.nameTranslationKey]}
                            onChange={(value) => onChangeCharacterTrait(trait.id, value)}
                            theme={theme}
                            value={dataSource?.[trait.id] || 0}
                        />
                    );
                })}
        </div>
    );
};
