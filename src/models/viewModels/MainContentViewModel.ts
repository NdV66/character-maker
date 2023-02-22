import { IMainContentViewModel, IAppContextViewModel } from '../../types';

export class MainContentViewModel implements IMainContentViewModel {
    constructor(private readonly _appContext: IAppContextViewModel) {}

    get translations$() {
        return this._appContext.translations$;
    }

    get theme$() {
        return this._appContext.theme$;
    }
}
