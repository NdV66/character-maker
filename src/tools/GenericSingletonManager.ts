import { NOT_FOUND_ERROR } from '../defaults';
import { TSingletons } from '../types';

export class GenericSingletonManager {
    private _singletons: TSingletons = {};

    constructor(singletons: TSingletons) {
        this._singletons = singletons;
    }

    public getSingleton<T>(name: string) {
        const singleton = this._singletons[name];

        if (!singleton) {
            throw NOT_FOUND_ERROR;
        }

        return singleton as T;
    }
}
