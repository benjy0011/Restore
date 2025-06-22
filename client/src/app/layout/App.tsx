// import { useState } from "react";
import NavBar from "./NavBar";
import { Box, Container, CssBaseline, ThemeProvider } from "@mui/material";

import { Outlet } from "react-router-dom";
import { getTheme } from "../../theme/theme";
import { useAppSelector } from "../store/store";
import { getBackgroundColor } from "../../styling/getBackgroundColor";
import { useEffect, useState } from "react";

function App() {
  // track mount
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100)

    return () => clearTimeout(timer);
  }, []);


  // const [darkMode, setDarkMode] = useState<boolean>(getInitialDarkMode);
  const darkMode = useAppSelector(state => state.ui.darkMode);

  const theme = getTheme(darkMode, mounted);

  // const handleToggleDarkMode = (): void => {
  //   setDarkMode(prev => {
  //     localStorage.setItem('darkMode', JSON.stringify(!prev));
  //     return !prev;
  //   });
  // };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />

      <Box 
        sx={{ 
          // minHeight: '100vh',
          height: "100%",
          ...(getBackgroundColor(darkMode, mounted))
        }}
      >
        <Container 
          maxWidth={"xl"} 
          sx={{
            pt: 2,
          }}
        >     
          <Outlet />
        </Container>
      </Box>
      
    
    </ThemeProvider>
    
  )
}

export default App
