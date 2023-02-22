import { TColors, TTheme } from '../types';
import { COMMONS } from './commons';

const COLORS: TColors = {
    primary: '#9153F4',
    accent: '#D6C5F0',
    pageBackground: '#00091e',
    background: '#001440',
};

export const DARK_THEME: TTheme = {
    ...COLORS,
    ...COMMONS,
};
