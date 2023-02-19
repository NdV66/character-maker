import { useState, useEffect } from 'react';
import { Observable } from 'rxjs';

export const useStateWithObservableWithInit = <T>(
    observable: Observable<T>,
    init: T,
    deps: React.DependencyList = [],
): T => {
    const [state, setState] = useState<T>(init);

    useEffect(() => {
        const subscription = observable.subscribe(setState);

        return () => {
            subscription.unsubscribe();
        };
    }, deps);

    return state;
};
