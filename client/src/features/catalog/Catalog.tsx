// import { useEffect, useState } from "react";
// import type { Product } from "../../app/models/product"
import { useFetchProductsQuery } from "./catalogApi"
import ProductList from "./ProductList"

const Catalog = () => {
  // const [productListing, setProductListing] = useState<Product[]>([]); // only check for the type for 'name' and 'price', if contain other field, will be stored no matter what

  // useEffect(() => {
  //     fetch('https://localhost:5001/api/products')
  //       .then(response => response.json())
  //       .then(data => setProductListing(data))
  //       .catch(error => console.error(`Error fetching data: ${error}`))
  //   }, [])

  const { 
    data: productListing, 
    isLoading 
  } = useFetchProductsQuery();

  return (
    <>
      <ProductList 
        productListing={productListing}
        isLoading={isLoading || !productListing}
      />

    </>
  )
}

export default Catalog