import { ImageExporter } from '../../../models';
import * as html2canvas from 'html2canvas';
import { DEFAULTS } from '../../../defaults';

jest.mock('uuid', () => ({
    v4: () => '123',
}));

jest.mock('html2canvas', () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

describe('ImageExporter', () => {
    let model: ImageExporter;

    beforeEach(() => {
        model = new ImageExporter();
    });

    test('Should return isExporting as false on enter', () => {
        expect(model.isExporting).toBe(false);
    });

    test('Should return isExporting as false on enter', () => {
        model['_isExporting'] = true;
        expect(model.isExporting).toBe(true);
    });

    test('Should export image (export())', () => {
        const element = {} as HTMLDivElement;
        model['_exportAsImage'] = jest.fn();

        model.export(element);

        expect(model['_exportAsImage']).toHaveBeenCalledTimes(1);
        expect(model['_exportAsImage']).toHaveBeenCalledWith(element, '123');
    });

    test.only('Should export an image (_exportAsImage())', async () => {
        const offsetWidth = 10;
        const expectedWidth = offsetWidth - 1;
        const element = { offsetWidth } as HTMLDivElement;
        const imageFileName = '123';
        const extension = 'jpeg';
        const expectedFileName = `${imageFileName}.${extension}`;
        const imageMock = 'imageHere';
        const toDataURLMock = jest.fn().mockReturnValue(imageMock);
        const html2canvasMock = jest
            .spyOn(html2canvas, 'default')
            .mockResolvedValue({ toDataURL: toDataURLMock } as any);
        model['_downloadImage'] = jest.fn();

        await model['_exportAsImage'](element, imageFileName);

        expect(html2canvasMock).toHaveBeenCalledTimes(1);
        expect(html2canvasMock).toHaveBeenCalledWith(element, { width: expectedWidth });
        expect(toDataURLMock).toHaveBeenCalledTimes(1);
        expect(toDataURLMock).toHaveBeenCalledWith(`image/${extension}`, DEFAULTS.QUALITY);
        expect(model['_downloadImage']).toHaveBeenCalledTimes(1);
        expect(model['_downloadImage']).toHaveBeenCalledWith(imageMock, expectedFileName);
    });

    test('Should download image (_downloadImage())', () => {
        const blob = 'blobLink';
        const filename = 'filename.jpeg';
        const linkMock = {
            href: '',
            download: '',
            style: { display: '' },
            click: jest.fn(),
            setAttribute: jest.fn(),
            remove: jest.fn(),
        } as any;
        const createElementSpy = jest.spyOn(document, 'createElement').mockReturnValueOnce(linkMock);
        document.body.appendChild = jest.fn();
        document.body.removeChild = jest.fn();

        model['_downloadImage'](blob, filename);

        expect(createElementSpy).toBeCalledWith('a');
        expect(linkMock.setAttribute.mock.calls.length).toBe(3);

        expect(linkMock.setAttribute.mock.calls[0]).toEqual(['style', 'display:none']);
        expect(linkMock.setAttribute.mock.calls[1]).toEqual(['download', filename]);
        expect(linkMock.setAttribute.mock.calls[2]).toEqual(['href', blob]);

        expect(document.body.appendChild).toHaveBeenCalledWith(linkMock);
        expect(document.body.removeChild).toHaveBeenCalledWith(linkMock);
        expect(linkMock.click).toHaveBeenCalled();
    });
});

export {};
