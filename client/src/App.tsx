import { useEffect, useState } from "react";

const products = [
  {name: 'product1', price: 100.00},
  {name: 'product2', price: 200.00},
  {name: 'product3', price: 300.00}
];


function App() {
  const [productListing, setProductListing] = useState<{name: string, price: number}[]>([]);

  useEffect(() => {
    fetch('https://localhost:5001/api/products')
      .then(response => response.json())
      .catch(error => console.error(`Error fetching data: ${error}`))
  }, [])

  const addProduct = () => {
    setProductListing(prev => (
      [
        ...prev, 
        {
          name: 'product' + (prev.length + 1), 
          price: (prev.length + 1) * 100.00
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
