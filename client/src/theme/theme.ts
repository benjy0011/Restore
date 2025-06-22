import { createTheme, type PaletteMode } from "@mui/material";
import { darkModeBgColor, getTransition, lightModeBgColor } from "../styling/getBackgroundColor";

export const getTheme = (
  darkMode: boolean,
  enableTransition: boolean = true,
) => {
  const palleteType: PaletteMode = darkMode ? "dark" : "light";

  return createTheme({
    palette: {
      mode: palleteType,
      background: {
        default: (palleteType === "light") ? lightModeBgColor : darkModeBgColor
      }
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {...getTransition(enableTransition)},
          '@global': {
            '*': {...getTransition(enableTransition)},
          } 
        }
      },
      MuiAppBar: {
        styleOverrides: {
          root: {...getTransition(enableTransition)}
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {...getTransition(enableTransition)}
        }
      },
      MuiCircularProgress: {
        styleOverrides: {
          root: {...getTransition(enableTransition)}
        }
      },
      MuiBadge: {
        styleOverrides: {
          root: {...getTransition(enableTransition)}
        }
      },
    }
  })
};