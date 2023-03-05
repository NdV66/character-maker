import html2canvas from 'html2canvas';
import { v4 as uuidv4 } from 'uuid';
import { IExporter } from '../../types';

export class ImageExporter implements IExporter {
    private _isExporting = false;

    get isExporting() {
        return this._isExporting;
    }

    private _downloadImage(blob: string, fileName: string) {
        const fakeLink = window.document.createElement('a') as any;
        fakeLink.style = 'display:none;';
        fakeLink.download = fileName;

        fakeLink.href = blob;

        document.body.appendChild(fakeLink);
        fakeLink.click();
        document.body.removeChild(fakeLink);

        fakeLink.remove();
    }

    private async _exportAsImage<T extends HTMLElement>(element: T, imageFileName: string) {
        const canvas = await html2canvas(element);
        const image = canvas.toDataURL('image/png', 1.0);
        this._downloadImage(image, imageFileName);
    }

    public async export<T extends HTMLElement>(element: T) {
        const imageFileName = uuidv4();
        await this._exportAsImage(element, imageFileName);
    }
}
