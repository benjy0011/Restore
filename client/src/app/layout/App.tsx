import { useEffect, useState } from "react";
import type { Product } from "../models/product";
import Catalog from "../../features/catalog/Catalog";
import NavBar from "./NavBar";
import { Box, Container, CssBaseline, ThemeProvider } from "@mui/material";
import getTheme from "../../theme/theme";

function App() {
  const getSystemThemePreference = () => 
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [productListing, setProductListing] = useState<Product[]>([]); // only check for the type for 'name' and 'price', if contain other field, will be stored no matter what
  
  const [darkMode, setDarkMode] = useState<boolean>(getSystemThemePreference);

  const theme = getTheme(darkMode);

  const handleToggleDarkMode = (): void => {
    setDarkMode(prev => !prev);
  };

  useEffect(() => {
    fetch('https://localhost:5001/api/products')
      .then(response => response.json())
      .then(data => setProductListing(data))
      .catch(error => console.error(`Error fetching data: ${error}`))
  }, [])

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
        }}
      >
        <Container maxWidth={"xl"} sx={{pt: 14}}>     
          <Catalog productListing={productListing}/>
        </Container>
      </Box>
      
    
    </ThemeProvider>
    
  )
}

export default App
