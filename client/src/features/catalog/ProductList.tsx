import { Box } from "@mui/material"
import type { Product } from "../../app/models/product"
import ProductCard from "./ProductCard"
import CircularProgressScreen from "../../components/CircularProgressScreen"

interface Props {
  productListing: Product[] | undefined,
  isLoading: boolean,
}

const ProductList = ({
  productListing,
  isLoading,
}: Props) => {

  if (isLoading) return <CircularProgressScreen />

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, 280px)", // card width
        justifyContent: 'center',
        padding: "0 auto",
        rowGap: 3,
        columnGap: 3,

        // display: 'flex',
        // flexWrap: 'wrap',
        // gap: 3,
        // justifyContent: 'center',

      }}
    >
      {productListing?.map((item) => (
        <ProductCard product={item} key={item.id} />
      ))}
    </Box>
  );
}

export default ProductList