import { createTheme } from "@mui/material";

export const transition = {
  transition: 'background-color 0.3s ease-in-out, color 0.3s ease-in-out'
};

export const getTheme = (darkMode: boolean) => {
  const palleteType = darkMode ? "dark" : "light";

  return createTheme({
    palette: {
      mode: palleteType,
      background: {
        default: (palleteType === "light") ? '#eaeaea' : '#121212'
      }
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {...transition},
          '@global': {
            '*': {...transition},
          } 
        }
      },
      MuiAppBar: {
        styleOverrides: {
          root: {...transition}
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {...transition}
        }
      },
    }
  })
};