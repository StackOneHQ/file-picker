interface InlineStyles {
    containerId: string;
    width?: string;
    height?: string;
}

interface OptionsStyles {
    back?: boolean;
    close?: boolean;
    bgColor?: string;
}

export interface HubStyles {
    inline?: InlineStyles;
    options?: OptionsStyles;
}