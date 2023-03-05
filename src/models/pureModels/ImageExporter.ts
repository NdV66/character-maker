import html2canvas from 'html2canvas';
import { v4 as uuidv4 } from 'uuid';
import { IExporter } from '../../types';

export class ImageExporter implements IExporter {
    private _isExporting = false;

    get isExporting() {
        return this._isExporting;
    }

    private _downloadImage(file: string, fileName: string) {
        const tmpLink = window.document.createElement('a') as any;
        tmpLink.style = 'display:none;';
        tmpLink.download = fileName;

        tmpLink.href = file;
        document.body.appendChild(tmpLink);
        tmpLink.click();

        document.body.removeChild(tmpLink);
        tmpLink.remove();
    }

    private async _exportAsImage<T extends HTMLElement>(element: T, imageFileName: string) {
        const canvas = await html2canvas(element, {
            width: element.offsetWidth - 1,
        });
        const image = canvas.toDataURL('image/png', 1.0);
        this._downloadImage(image, imageFileName);
    }

    public async export<T extends HTMLElement>(element: T) {
        const imageFileName = uuidv4();
        await this._exportAsImage(element, imageFileName);
    }
}
