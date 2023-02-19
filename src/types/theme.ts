export type TColors = {
    primary: string;
    accent: string;
    background: string;
    pageBackground: string;
};

export type TCommonStyles = {
    fontSize: number;
    baseSpace: number;
    smallFontSize: number;
};

export type TTheme = TColors & TCommonStyles;
