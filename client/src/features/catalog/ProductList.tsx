import { Box } from "@mui/material"
import type { Product } from "../../app/models/product"
import ProductCard from "./ProductCard"

interface Props {
  productListing: Product[],
}

const ProductList = ({
  productListing,
}: Props) => {
  return (
    <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: "center"}}>
      {productListing.map(item => (
        <ProductCard 
          product={item}
          key={item.id}
        />
      ))}
    </Box>
  )
}

export default ProductList