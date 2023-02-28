import { ICookiesManager } from '../../types';

export const cookiesManagerMock: ICookiesManager = {
    getFromCookies: jest.fn(),
    setCookie: jest.fn(),
};
