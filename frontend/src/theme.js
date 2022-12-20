import {createTheme} from "@mui/material/styles";
import {lighten} from "polished";

export const DrawerWidth = 250;

export const Colors = {
    primary: "rgba(17,51,98,0.88)",
    secondary: "#d1adcc",
    success: "#4CAF50",
    info: "#00a2ff",
    danger: "#FF5722",
    warning: "#FFC107",
    dark: "#0e1b20",
    light: "#aaa",
    muted: "#abafb3",
    border: "#DDDFE1",
    inverse: "#2F3D4A",
    shaft: "#333",
    dim_grey: "#696969",
    dove_gray: "#d5d5d5",
    body_bg: "#f3f6f9",
    light_gray: "rgb(230,230,230)",
    white: "#fff",
    black: "#fff",
    blue: "#6E9C9F",
};

const theme = createTheme({
    palette: {
        primary: {
            main: Colors.primary,
        },
        secondary: {
            main: Colors.secondary,
        },
    },

    components: {
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
                fullWidth: true,
            }
        },
        MuiButton: {
            defaultProps: {
                disableRipple: true,
                disableElevation: true,
            },
        },
        MuiTooltip: {
            defaultProps: {
                arrow: true,
            },
            styleOverrides: {
                tooltip: {
                    background: Colors.blue,
                },
                arrow: {
                    color: Colors.blue,
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    width: DrawerWidth,
                    background: Colors.primary,
                    color: Colors.dark,
                }
            }
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: lighten(0.2, Colors.primary)
                }
            }
        },
        MyShopButton: {
            styleOverrides: {
                root: {
                    color: Colors.white,
                },
                primary: {
                    background: Colors.primary,
                    "&:hover": {
                        background: lighten(0.05, Colors.primary),
                    },
                },
                secondary: {
                    background: `${Colors.secondary}`,
                    "&:hover": {
                        background: lighten(0.05, Colors.primary),
                    },
                },
            },
        },
    },
});

export default theme;
