import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Theme {
        status: {
            danger: string;
        };
    }
    interface ThemeOptions {
        status?: {
            danger?: string;
        };
    }
    interface Palette {
        tertiary?: Palette['primary'];
    }
    interface PaletteOptions {
        tertiary?: PaletteOptions['primary'];
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        danger: true;
    }
    interface ButtonPropsSizeOverrides {
        extraLarge: true;
    }
}

export const theme = createTheme({
    status: {
        danger: '#e53e3e',
    },
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
        tertiary: {
            main: '#2e7d32',
            contrastText: '#fff',
        },
    },
    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant: 'danger' },
                    style: {
                        backgroundColor: '#e53e3e',
                        color: '#fff',
                        '&:hover': { backgroundColor: '#c53030' },
                    },
                },
                {
                    props: { size: 'extraLarge' },
                    style: {
                        padding: '16px 32px',
                        fontSize: '1.1rem',
                    },
                },
            ],
        },
    },
});


