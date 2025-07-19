// import { useEffect, useState } from "react";
// import type { Product } from "../../app/models/product"
import { Grid, Typography } from "@mui/material";
import { useFetchFiltersQuery, useFetchProductsQuery } from "./catalogApi";
import ProductList from "./ProductList";
import Filters from "./Filters";
import CircularProgressScreen from "../../app/shared/components/CircularProgressScreen";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import AppPagination from "../../app/shared/components/AppPagination";
import { setPageNumber } from "./catalogSlice";

const Catalog = () => {
  // const [productListing, setProductListing] = useState<Product[]>([]); // only check for the type for 'name' and 'price', if contain other field, will be stored no matter what

  // useEffect(() => {
  //     fetch('https://localhost:5001/api/products')
  //       .then(response => response.json())
  //       .then(data => setProductListing(data))
  //       .catch(error => console.error(`Error fetching data: ${error}`))
  //   }, [])

  const productParams = useAppSelector((state) => state.catalog);
  const { data: productData, isLoading: isProductLoading } = useFetchProductsQuery(productParams);
  const { data: filterData, isLoading: isFilterLoading } = useFetchFiltersQuery();
  const dispatch = useAppDispatch();

  const isLoading = isProductLoading || isFilterLoading;

  if (isLoading || !productData || !filterData) return <CircularProgressScreen />;

  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, md: 3}}>
        <Filters data={filterData} isLoading={isFilterLoading} />
      </Grid>

      <Grid size={{ xs: 12, md: 9}}>
        {productData.items && productData.items.length > 0 ? (
          <>
            <ProductList productListing={productData?.items} />

            <AppPagination
              metadata={productData.pagination}
              onPageChange={(page: number) => {
                dispatch(setPageNumber(page));
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
            />
          </>
        ) : (
          <Typography variant="h5">
            There are no results for this filter.
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default Catalog;
