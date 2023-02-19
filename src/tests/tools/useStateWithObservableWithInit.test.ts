import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Observable, Subject } from 'rxjs';
import { useStateWithObservableWithInit } from '../../tools/useStateWithObservableWithInit';

const nextValue = 66;
const initialValue = 6;

describe('useStateWithObservableWithInit', () => {
    describe('Should work with subjects', () => {
        let observable: Subject<number>;

        beforeEach(() => {
            observable = new Subject<number>();
        });

        test('- keep initial value if no changes', () => {
            const { result } = renderHook(() => useStateWithObservableWithInit(observable, initialValue));
            expect(result.current).toBe(initialValue);
        });

        test('- keep last value', () => {
            const { result } = renderHook(() => useStateWithObservableWithInit(observable, initialValue));

            act(() => {
                observable.next(nextValue);
            });

            expect(result.current).toBe(nextValue);
        });
    });

    describe('Should work with observables', () => {
        test('- keep last value', () => {
            const observable = new Observable<number>((observer) => observer.next(nextValue));
            const { result } = renderHook(() => useStateWithObservableWithInit(observable, initialValue));
            expect(result.current).toBe(nextValue);
        });
    });
});
