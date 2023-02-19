import { TColors, TTheme } from '../types';
import { COMMONS } from './commons';

//https://coolors.co/9c89b8-f0a6ca-efc3e6-f0e6ef-b8bedd
//https://coolors.co/a09abc-b6a6ca-d5cfe1-e1dee9-d4bebe
//https://coolors.co/dabfff-907ad6-4f518c-2c2a4a-7fdeff <---

const COLORS: TColors = {
    primary: '#2C2A4A',
    accent: '#4F518C',
    background: '#fff',
    pageBackground: '#ebecf0',
};

export const LIGHT_THEME: TTheme = {
    ...COLORS,
    ...COMMONS,
};
