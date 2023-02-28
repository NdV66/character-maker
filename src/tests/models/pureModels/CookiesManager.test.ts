import Cookies from 'js-cookie';
import { CookiesManager } from '../../../models/pureModels/CookiesManager';

const KEY = 'TEST_KEY';
const VALUE = 'lotr';

describe('CookiesManager', () => {
    let model: CookiesManager;

    beforeEach(() => {
        model = new CookiesManager();
    });

    test('should set value in cookies', () => {
        const mock = jest.spyOn(Cookies, 'set');
        model.setCookie(KEY, VALUE);

        expect(mock).toBeCalledTimes(1);
        expect(mock).toBeCalledWith(KEY, VALUE, CookiesManager['_COOKIE_OPTIONS']);
    });

    test('should set value in cookies', () => {
        const mock = jest.spyOn(Cookies, 'get').mockReturnValue(VALUE as any);
        const result = model.getFromCookies(KEY);

        expect(mock).toBeCalledTimes(1);
        expect(mock).toBeCalledWith(KEY);
        expect(result).toBe(VALUE);
    });
});

export {};
