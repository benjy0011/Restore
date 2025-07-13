// import { useEffect, useState } from "react";
// import type { Product } from "../../app/models/product"
import { Grid } from "@mui/material";
import { useFetchProductsQuery } from "./catalogApi";
import ProductList from "./ProductList";
import Filters from "./Filters";
import CircularProgressScreen from "../../app/shared/components/CircularProgressScreen";
import { useAppSelector } from "../../app/store/store";

const Catalog = () => {
  // const [productListing, setProductListing] = useState<Product[]>([]); // only check for the type for 'name' and 'price', if contain other field, will be stored no matter what

  // useEffect(() => {
  //     fetch('https://localhost:5001/api/products')
  //       .then(response => response.json())
  //       .then(data => setProductListing(data))
  //       .catch(error => console.error(`Error fetching data: ${error}`))
  //   }, [])

  const productParams = useAppSelector((state) => state.catalog);
  const { data: productListing, isLoading } = useFetchProductsQuery(productParams);

  if (isLoading) return <CircularProgressScreen />;

  return (
    <Grid container spacing={4}>
      <Grid size={3}>
        <Filters />
      </Grid>

      <Grid size={9}>
        <ProductList productListing={productListing} />
      </Grid>
    </Grid>
  );
};

export default Catalog;
