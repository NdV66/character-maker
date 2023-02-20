import { Observable } from 'rxjs';
import { AppLangs } from '../langs';

type ItemType = {
    key: string;
    label: string;
};

export interface IChangeLangElementViewModel {
    appLang$: Observable<AppLangs>;
    items$: Observable<ItemType[]>;

    changeAppLang: (value: AppLangs) => void;
}
