import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Observable, Subject } from 'rxjs';
import { useStateWithObservable } from '../../tools';

const nextValue = 66;

describe('useStateWithObservable', () => {
    describe('Should work with subjects', () => {
        let observable: Subject<number>;

        beforeEach(() => {
            observable = new Subject<number>();
        });

        test('- undefined as initial value if no changes', () => {
            const { result } = renderHook(() => useStateWithObservable(observable));
            expect(result.current).toBeUndefined();
        });

        test('- keep last value', () => {
            const { result } = renderHook(() => useStateWithObservable(observable));

            act(() => {
                observable.next(nextValue);
            });

            expect(result.current).toBe(nextValue);
        });
    });

    describe('Should work with observables', () => {
        test('- keep last value', () => {
            const observable = new Observable<number>((observer) => observer.next(nextValue));
            const { result } = renderHook(() => useStateWithObservable(observable));
            expect(result.current).toBe(nextValue);
        });
    });
});
