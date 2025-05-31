import type { Product } from "../../app/models/product"
import ProductList from "./ProductList"

interface Props {
  productListing: Product[],
}


const Catalog = ({
  productListing,
}: Props) => {

  return (
    <>
      <ProductList 
        productListing={productListing}
      />

    </>
  )
}

export default Catalog