import { IExporter } from '../../types';

export const imageExporterMock = () =>
    ({
        isExporting: false,
        export: jest.fn(),
    } as IExporter);
