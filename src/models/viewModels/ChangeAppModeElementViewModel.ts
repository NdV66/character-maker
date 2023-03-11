import { firstValueFrom } from 'rxjs';
import { IAppContextViewModel, IChangeAppModeElementViewModel } from '../../types';

//TODO: tests
export class ChangeAppModeElementViewModel implements IChangeAppModeElementViewModel {
    constructor(private readonly _appContext: IAppContextViewModel) {}

    get translations$() {
        return this._appContext.translations$;
    }

    get theme$() {
        return this._appContext.theme$;
    }

    get isFreeHandMode$() {
        return this._appContext.isFreeHandMode$;
    }

    public async toggleIsFreeHandMode() {
        const value = await firstValueFrom(this._appContext.isFreeHandMode$);
        this._appContext.setIsFreeHandMode(!value);
    }
}
