/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { useRef } from 'react';
import { useCharacterTraitsElementViewModel } from '../../useViewModels/useCharacterTraitsElementViewModel';
import { AppSlider, WarningParagraph, ButtonsElement } from '../elements';
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
        showTip,
    } = useCharacterTraitsElementViewModel();
    const themedStyles = styles(theme);
    const exportRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <div ref={exportRef} css={themedStyles.exportCard}>
                <div css={themedStyles.showTipWrapper}>
                    {showTip && (
                        <WarningParagraph theme={theme} align="right">
                            {translations.CHANGE_MODE_TIP}
                        </WarningParagraph>
                    )}
                </div>

                {characterTraitsPairs.map((trait) => (
                    <AppSlider
                        key={trait.id}
                        leftText={translations.CHARACTER_TRAITS[trait.mainCharacterTrait.nameTranslationKey]}
                        rightText={translations.CHARACTER_TRAITS[trait.oppositeCharacterTrait.nameTranslationKey]}
                        onChange={(value) => onChangeCharacterTrait(trait.id, value)}
                        theme={theme}
                        mainValue={dataSource?.[trait.id].mainPercent || 0}
                        oppositeValue={dataSource?.[trait.id].oppositePercent || 0}
                    />
                ))}
            </div>

            <ButtonsElement
                theme={theme}
                translations={translations}
                onCleanAll={resetAll}
                isExporting={isExporting}
                onExport={() => exportToImage(exportRef)}
            />
        </>
    );
};

const styles = (theme: TTheme) => ({
    showTipWrapper: css`
        min-height: ${theme.fontSize * 1.5}px;
        margin-bottom: ${theme.baseSpace}px;
    `,
    exportCard: css`
        background-color: ${theme.background};
        padding: ${3 * theme.baseSpace}px;
    `,
});
