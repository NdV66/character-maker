import { IExporter } from '../../types';

export class ImageExporter implements IExporter {
    public export() {
        console.log('EXPORTING');
    }
}
