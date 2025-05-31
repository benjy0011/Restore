import { useEffect, useState } from "react";
import type { Product } from "../models/product";


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
          pictureUrl: 'https://picsum.photo/200',
          type: 'test',
          brand: 'test',
        }
      ]
    ));
  }

  return (
    <>
      <h1 style={{ color: 'red' }}>Re-store</h1>

      <ul>
        {productListing.map((item, index) => 
          (
            <li key={`${item.name}-${index}`}>{item.name} - {item.price}</li>
          ))}
      </ul>

      <button
        onClick={addProduct}
      >
        Add Product
      </button>
    </>
  )
}

export default App
