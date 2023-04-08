import html2canvas from 'html2canvas';
import { v4 as uuidv4 } from 'uuid';
import { DEFAULTS } from '../../defaults';
import { IExporter } from '../../types';

export class ImageExporter implements IExporter {
    private _isExporting = false;

    get isExporting() {
        return this._isExporting;
    }

    private _downloadImage(blob: string, fileName: string) {
        const tmpLink = window.document.createElement('a');

        tmpLink.setAttribute('style', 'display:none');
        tmpLink.setAttribute('download', fileName);
        tmpLink.setAttribute('href', blob);

        document.body.appendChild(tmpLink);
        tmpLink.click();

        document.body.removeChild(tmpLink);
        tmpLink.remove();
    }

    private async _exportAsImage<T extends HTMLElement>(element: T, imageFileName: string) {
        const extension = 'jpeg';
        const canvas = await html2canvas(element, {
            width: element.offsetWidth - 1,
        });
        const image = canvas.toDataURL(`image/${extension}`, DEFAULTS.QUALITY);
        const fileName = `${imageFileName}.${extension}`;
        this._downloadImage(image, fileName);
    }

    public async export<T extends HTMLElement>(element: T) {
        const imageFileName = uuidv4();
        await this._exportAsImage(element, imageFileName);
    }
}
