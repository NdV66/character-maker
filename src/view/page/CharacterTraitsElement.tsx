import { ExportOutlined } from '@ant-design/icons';
import { useRef } from 'react';
import { useCharacterTraitsElementViewModel } from '../../useViewModels/useCharacterTraitsElementViewModel';
import { AppButton, AppSlider, CleanButton } from '../elements';

export const CharacterTraitsElement: React.FC = () => {
    const { theme, onChangeCharacterTrait, translations, characterTraitsPairs, dataSource, resetAll, exportToImage } =
        useCharacterTraitsElementViewModel();

    const exportRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={exportRef}>
            {characterTraitsPairs.map((trait) => {
                return (
                    <AppSlider
                        key={trait.id}
                        leftText={translations.CHARACTER_TRAITS[trait.mainCharacterTrait.nameTranslationKey]}
                        rightText={translations.CHARACTER_TRAITS[trait.oppositeCharacterTrait.nameTranslationKey]}
                        onChange={(value) => onChangeCharacterTrait(trait.id, value)}
                        theme={theme}
                        mainValue={dataSource?.[trait.id].mainPercent || 0}
                        oppositeValue={dataSource?.[trait.id].oppositePercent || 0}
                    />
                );
            })}

            <CleanButton theme={theme} translations={translations} onCleanAll={resetAll} disabled={false} />

            <AppButton
                onClick={() => exportToImage(exportRef)}
                theme={theme}
                icon={<ExportOutlined />}
                text="EXPORT TODO"
            />
        </div>
    );
};
