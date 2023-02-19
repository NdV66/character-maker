import { useState, useEffect } from 'react';
import { Observable } from 'rxjs';

export const useStateWithObservable = <T>(
    observable: Observable<T>,
    deps: React.DependencyList = [],
): T | undefined => {
    const [state, setState] = useState<T>();

    useEffect(() => {
        const subscription = observable.subscribe(setState);

        return () => {
            subscription.unsubscribe();
        };
    }, deps);

    return state;
};
