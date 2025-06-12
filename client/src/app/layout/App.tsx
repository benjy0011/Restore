import { useState } from "react";
import NavBar from "./NavBar";
import { Box, Container, CssBaseline, ThemeProvider } from "@mui/material";

import { Outlet } from "react-router-dom";
import { getTheme, transition } from "../../theme/theme";

function App() {
  const getSystemThemePreference = () => 
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  
  const [darkMode, setDarkMode] = useState<boolean>(getSystemThemePreference);

  const theme = getTheme(darkMode);

  const handleToggleDarkMode = (): void => {
    setDarkMode(prev => !prev);
  };

  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <NavBar 
        darkMode={darkMode} 
        handleToggleDarkMode={handleToggleDarkMode} 
      />

      <Box 
        sx={{ 
          minHeight: '100vh', 
          backgroundColor: darkMode 
            ?  '#121212' 
            : '#eaeaea',
          transition: transition.transition
        }}
      >
        <Container maxWidth={"xl"} sx={{pt: 2}}>     
          <Outlet />
        </Container>
      </Box>
      
    
    </ThemeProvider>
    
  )
}

export default App
