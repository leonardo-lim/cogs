'use client';

import type { Theme, ThemeOptions } from '@mui/material/styles';
import { createTheme as createMuiTheme } from '@mui/material/styles';

const baseTheme = {
    typography: {
        fontFamily: '"Rethink Sans", sans-serif'
    }
};

interface CreateThemeProps {
    themeOverrides?: ThemeOptions;
}

const createTheme = ({ themeOverrides = {} }: CreateThemeProps = {}): Theme => {
    const theme = createMuiTheme(baseTheme, themeOverrides);
    return theme;
};

export { createTheme };