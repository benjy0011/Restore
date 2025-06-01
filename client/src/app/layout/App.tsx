import { useEffect, useState } from "react";
import type { Product } from "../models/product";
import Catalog from "../../features/catalog/Catalog";
import NavBar from "./NavBar";
import { Container } from "@mui/material";


function App() {
  const [productListing, setProductListing] = useState<Product[]>([]); // only check for the type for 'name' and 'price', if contain other field, will be stored no matter what

  useEffect(() => {
    fetch('https://localhost:5001/api/products')
      .then(response => response.json())
      .then(data => setProductListing(data))
      .catch(error => console.error(`Error fetching data: ${error}`))
  }, [])

  return (
    <>
      <NavBar />


      <Container 
        // maxWidth={false}
        maxWidth={"xl"}
        sx={{
          mt: 14
        }}
      >     

        {/* Catalog */}
        <Catalog 
          productListing={productListing}
        />

        
      </Container>
    
    </>
    
  )
}

export default App
