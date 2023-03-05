/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { useRef } from 'react';
import { useCharacterTraitsElementViewModel } from '../../useViewModels/useCharacterTraitsElementViewModel';
import { AppButton, AppSlider, CleanButton } from '../elements';
import { TTheme } from '../../types';

export const CharacterTraitsElement: React.FC = () => {
    const {
        theme,
        onChangeCharacterTrait,
        translations,
        characterTraitsPairs,
        dataSource,
        resetAll,
        exportToImage,
        isExporting,
    } = useCharacterTraitsElementViewModel();
    const themedStyles = styles(theme);

    const exportRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <div ref={exportRef} css={themedStyles.exportCard}>
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
            </div>

            <div css={themedStyles.buttons}>
                <CleanButton theme={theme} translations={translations} onCleanAll={resetAll} disabled={isExporting} />
                <AppButton
                    onClick={() => exportToImage(exportRef)}
                    theme={theme}
                    text={translations.EXPORT}
                    disabled={isExporting}
                />
            </div>
        </>
    );
};

const styles = (theme: TTheme) => ({
    exportCard: css`
        background-color: ${theme.background};
        padding: ${theme.baseSpace}px;
    `,
    buttons: css`
        display: flex;
        justify-content: space-between;
        margin-top: ${3 * theme.baseSpace}px;
    `,
});
