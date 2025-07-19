import { Grid } from "@mui/material";
import type { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";

interface Props {
  productListing: Product[] | undefined;
}

const ProductList = ({ productListing }: Props) => {
  return (
    // <Box
    //   sx={{
    //     display: "grid",
    //     gridTemplateColumns: "repeat(auto-fit, 280px)", // card width
    //     justifyContent: "center",
    //     padding: "0 auto",
    //     rowGap: 3,
    //     columnGap: 3,
    //   }}
    // >
    //   {productListing?.map((item) => (
    //     <ProductCard product={item} key={item.id} />
    //   ))}
    // </Box>

    <Grid container spacing={{}}>
      {productListing?.map((product) => (
        <Grid 
          key={product.id} 
          size={{ xs: 12, sm: 6, md: 4, lg: 3 }} 
          display="flex"
          justifyContent="center"
        >
          <ProductCard key={product.id} product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
