'use client';

import type { Theme, ThemeOptions } from '@mui/material/styles';
import type {
    ThemeProviderProps as MuiThemeProviderProps
} from '@mui/material/styles/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as ThemeVarsProvider } from '@mui/material/styles';
import { createTheme } from './create-theme';

type ThemeProviderProps = Omit<MuiThemeProviderProps, 'theme'> & {
    theme?: Theme;
    themeOverrides?: ThemeOptions;
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({ themeOverrides, children, ...other }) => {
    const theme = createTheme({ themeOverrides });

    return (
        <ThemeVarsProvider theme={theme} {...other} disableTransitionOnChange>
            <CssBaseline />
            {children}
        </ThemeVarsProvider>
    );
};

export { ThemeProvider };