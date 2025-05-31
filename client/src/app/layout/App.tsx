import { useEffect, useState } from "react";
import type { Product } from "../models/product";
import Catalog from "../../features/catalog/Catalog";
import { Box, Button, Container, Typography } from '@mui/material';


function App() {
  const [productListing, setProductListing] = useState<Product[]>([]); // only check for the type for 'name' and 'price', if contain other field, will be stored no matter what

  useEffect(() => {
    fetch('https://localhost:5001/api/products')
      .then(response => response.json())
      .then(data => setProductListing(data))
      .catch(error => console.error(`Error fetching data: ${error}`))
  }, [])

  const addProduct = () => {
    setProductListing(prev => (
      [
        ...prev, 
        {
          id: prev.length + 1,
          name: 'product' + (prev.length + 1), 
          price: (prev.length + 1) * 100.00,
          quantityInStock: 100,
          description: 'test',
          pictureUrl: `https://picsum.photos/id/${prev.length + 1}/200/300`,
          type: 'test',
          brand: 'test',
        }
      ]
    ));
  }

  return (
    <Container 
      // maxWidth={false}
      maxWidth={"xl"}
    >
      {/* Title */}
      <Box display="flex" justifyContent="center" gap={3} marginY={3}>
         <Typography variant="h4">Re-store</Typography>
         <Button variant="contained" onClick={addProduct}>Add Product</Button>
      </Box>
     

      {/* Catalog */}
      <Catalog 
        productListing={productListing}
      />

      
    </Container>
  )
}

export default App
