import { IExporter } from '../../types';

export const imageExporterMock = () =>
    ({
        export: jest.fn(),
    } as IExporter);
