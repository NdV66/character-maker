export interface IExporter {
    isExporting: boolean;

    export: <T extends HTMLElement>(element: T) => Promise<void>;
}
