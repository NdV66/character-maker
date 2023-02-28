export interface ICookiesManager {
    getFromCookies: <T>(key: string) => T;
    setCookie: (key: string, value: string) => void;
}
