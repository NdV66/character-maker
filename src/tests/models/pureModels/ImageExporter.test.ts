import { ImageExporter } from '../../../models';

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

    test('Should download image (_downloadImage)', () => {
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
