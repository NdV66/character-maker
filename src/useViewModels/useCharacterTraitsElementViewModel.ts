import { getModelByKey } from '../context';
import { DEFAULTS } from '../defaults';
import { useStateWithObservable, useStateWithObservableWithInit } from '../tools';
import { ICharacterTraitsElementViewModel, Models } from '../types';

import html2canvas from 'html2canvas';

const downloadImage = (blob: any, fileName: any) => {
    const fakeLink = window.document.createElement('a') as any;
    fakeLink.style = 'display:none;';
    fakeLink.download = fileName;

    fakeLink.href = blob;

    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);

    fakeLink.remove();
};

const exportAsImage = async (element: HTMLDivElement, imageFileName: any) => {
    const canvas = await html2canvas(element);
    const image = canvas.toDataURL('image/png', 1.0);
    downloadImage(image, imageFileName);
};

export const useCharacterTraitsElementViewModel = () => {
    const viewModel = getModelByKey<ICharacterTraitsElementViewModel>(Models.CHARACTER_TRAITS_ELEMENT_VIEW_MODEL);
    const dataSource = useStateWithObservable(viewModel.data$);
    const theme = useStateWithObservableWithInit(viewModel.theme$, DEFAULTS.THEME);
    const translations = useStateWithObservableWithInit(viewModel.translations$, DEFAULTS.TRANSLATIONS);

    const exportToImage = (ref: React.RefObject<HTMLDivElement>) => {
        viewModel.exportToImage();
        ref.current && exportAsImage(ref.current, 'test');
    };

    return {
        theme,
        translations,
        onChangeCharacterTrait: viewModel.updatePairPercentById,
        characterTraitsPairs: viewModel.characterTraitsPairs,
        dataSource,
        resetAll: viewModel.resetAll,
        exportToImage,
    };
};
