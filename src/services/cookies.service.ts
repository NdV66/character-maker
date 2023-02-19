import Cookies, { CookieAttributes } from 'js-cookie';

export const COOKIE_OPTIONS: CookieAttributes = { sameSite: 'strict' };

export const getFromCookies = <T>(key: string) => Cookies.get(key) as T;

export const setCookie = (key: string, value: string) => Cookies.set(key, value, COOKIE_OPTIONS);
