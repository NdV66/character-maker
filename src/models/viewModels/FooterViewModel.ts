import { IAppContextViewModel, IFooterViewModel } from '../../types';
import packageInfo from '../../../package.json';

export class FooterViewModel implements IFooterViewModel {
    constructor(private _appContext: IAppContextViewModel) {}

    get theme$() {
        return this._appContext.theme$;
    }

    get translations$() {
        return this._appContext.translations$;
    }

    get version() {
        return packageInfo.version;
    }
}
