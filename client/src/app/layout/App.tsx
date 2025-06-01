import { useEffect, useState } from "react";
import type { Product } from "../models/product";
import Catalog from "../../features/catalog/Catalog";
import NavBar from "./NavBar";
import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";


function App() {
  const [productListing, setProductListing] = useState<Product[]>([]); // only check for the type for 'name' and 'price', if contain other field, will be stored no matter what
  
  const darkMode = true;
  const palleteType = darkMode ? "dark" : "light";

  const theme = createTheme({
    palette: {
      mode: palleteType,
      background: {
        default: (palleteType === "light") ? '#eaeaea' : '#121212'
      }
    }
  });

  useEffect(() => {
    fetch('https://localhost:5001/api/products')
      .then(response => response.json())
      .then(data => setProductListing(data))
      .catch(error => console.error(`Error fetching data: ${error}`))
  }, [])

  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <NavBar />

      <Box 
        sx={{ 
          minHeight: '100vh', 
          // background: darkMode ? '#121212' : '#eaeaea' 
        }}
      >
        <Container maxWidth={"xl"} sx={{mt: 14}}>     
          <Catalog productListing={productListing}/>
        </Container>
      </Box>
      
    
    </ThemeProvider>
    
  )
}

export default App
