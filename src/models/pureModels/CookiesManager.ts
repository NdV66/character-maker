import Cookies, { CookieAttributes } from 'js-cookie';
import { ICookiesManager } from '../../types';

export class CookiesManager implements ICookiesManager {
    private static _COOKIE_OPTIONS: CookieAttributes = { sameSite: 'strict' };

    public getFromCookies<T>(key: string) {
        return Cookies.get(key) as T;
    }

    public setCookie(key: string, value: string) {
        Cookies.set(key, value, CookiesManager._COOKIE_OPTIONS);
    }
}
