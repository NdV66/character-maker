import Cookies from 'js-cookie';
import { COOKIE_OPTIONS, getFromCookies, setCookie } from '../../services/cookies.service';

const KEY = 'TEST_KEY';
const VALUE = 'lotr';

describe('getFromCookies', () => {
    test('should set value in cookies', () => {
        const mock = jest.spyOn(Cookies, 'set');

        setCookie(KEY, VALUE);

        expect(mock).toBeCalledTimes(1);
        expect(mock).toBeCalledWith(KEY, VALUE, COOKIE_OPTIONS);
    });
});

describe('getFromCookies', () => {
    test('should set value in cookies', () => {
        const mock = jest.spyOn(Cookies, 'get').mockReturnValue(VALUE as any);

        const result = getFromCookies(KEY);

        expect(mock).toBeCalledTimes(1);
        expect(mock).toBeCalledWith(KEY);
        expect(result).toBe(VALUE);
    });
});
