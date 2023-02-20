import { Observable } from 'rxjs';
import { TTranslations } from '../langs';
import { TTheme } from '../theme';

export interface IAppContextViewModel {
    theme$: Observable<TTheme>;
    translations$: Observable<TTranslations>;
    isLoading$: Observable<boolean>;

    setDefaultValues: () => boolean;
    setIsLoading: (value: boolean) => void;
}
