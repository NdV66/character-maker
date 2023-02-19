/** @jsxImportSource @emotion/react */
import { SerializedStyles, css } from '@emotion/react';

import { TCommonStyles } from '../types';

export const COMMONS: TCommonStyles = {
    fontSize: 16,
    baseSpace: 8,
    smallFontSize: 12,
};

export const BREAKPOINTS = {
    SM: 576,
    MD: 768,
};

export const screenMd = (styles: SerializedStyles) =>
    css`
        @media screen and (max-width: ${BREAKPOINTS.MD}px) {
            ${styles}
        }
    `;
