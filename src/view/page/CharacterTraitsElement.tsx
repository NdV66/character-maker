/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { useRef } from 'react';
import { useCharacterTraitsElementViewModel } from '../../useViewModels/useCharacterTraitsElementViewModel';
import { AppSlider, WarningParagraph, ButtonsElement } from '../elements';
import { TTheme } from '../../types';
import { DEFAULTS } from '../../defaults';

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
            <div css={themedStyles.showTipWrapper}>
                {showTip && (
                    <WarningParagraph theme={theme} align="right">
                        {translations.CHANGE_MODE_TIP}
                    </WarningParagraph>
                )}
            </div>

            <div ref={exportRef} css={themedStyles.exportCard}>
                {characterTraitsPairs.map((trait) => (
                    <AppSlider
                        key={trait.id}
                        mainText={translations.CHARACTER_TRAITS[trait.mainCharacterTrait.nameTranslationKey]}
                        oppositeText={translations.CHARACTER_TRAITS[trait.oppositeCharacterTrait.nameTranslationKey]}
                        onChange={(value) => onChangeCharacterTrait(trait.id, value)}
                        theme={theme}
                        mainValue={dataSource?.[trait.id].mainPercent || DEFAULTS.MIN_PERCENT}
                        oppositeValue={dataSource?.[trait.id].oppositePercent || DEFAULTS.MIN_PERCENT}
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
        margin-top: ${theme.baseSpace}px;
    `,
    exportCard: css`
        background-color: ${theme.background};
        padding: ${3 * theme.baseSpace}px;
    `,
});
